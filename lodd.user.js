// ==UserScript==
// @name         Luogu Original Difficulty Display
// @version      3.2
// @description  Luogu original difficulty display
// @author       cmk666
// @match        https://www.luogu.com.cn/*
// @connect      codeforces.com
// @connect      kenkoooo.com
// @icon         https://www.google.com/s2/favicons?sz=64&domain=luogu.com.cn
// @grant        GM_xmlhttpRequest
// ==/UserScript==

const style_string = `
.lodd-cf-gray { font-weight: bold; color: gray; }
.lodd-cf-green { font-weight: bold; color: green; }
.lodd-cf-cyan { font-weight: bold; color: #03a89e; }
.lodd-cf-blue { font-weight: bold; color: blue; }
.lodd-cf-purple { font-weight: bold; color: #a0a; }
.lodd-cf-orange { font-weight: bold; color: #ff8c00; }
.lodd-cf-red, .lodd-cf-blackred { font-weight: bold; color: red; }
.lodd-cf-blackred:first-letter { font-weight: bold; color: black; }
.lodd-at-gray { font-weight: bold; color: #808080; }
.lodd-at-brown { font-weight: bold; color: #804000; }
.lodd-at-green { font-weight: bold; color: #008000; }
.lodd-at-aqua { font-weight: bold; color: #00c0c0; }
.lodd-at-blue { font-weight: bold; color: #0000ff; }
.lodd-at-yellow { font-weight: bold; color: #c0c000; }
.lodd-at-orange { font-weight: bold; color: #ff8000; }
.lodd-at-red { font-weight: bold; color: #ff0000; }
`;

var dif, cla, ele;

const upd_dif = () => {
	if ( dif !== undefined && cla !== undefined && ele !== undefined ) {
		ele.innerText = dif;
		if ( cla !== '' ) {
			ele.classList.add(cla);
		}
	}
};
const get_cf_class = d => {
	if ( d < 1200 ) return 'lodd-cf-gray';
	if ( 1200 <= d && d < 1400 ) return 'lodd-cf-green';
	if ( 1400 <= d && d < 1600 ) return 'lodd-cf-cyan';
	if ( 1600 <= d && d < 1900 ) return 'lodd-cf-blue';
	if ( 1900 <= d && d < 2100 ) return 'lodd-cf-purple';
	if ( 2100 <= d && d < 2400 ) return 'lodd-cf-orange';
	if ( 2400 <= d && d < 3000 ) return 'lodd-cf-red';
	if ( 3000 <= d ) return 'lodd-cf-blackred';
	return '';
};
const get_at_class = d => {
	if ( d < 400 ) return 'lodd-at-gray';
	if ( 400 <= d && d < 800 ) return 'lodd-at-brown';
	if ( 800 <= d && d < 1200 ) return 'lodd-at-green';
	if ( 1200 <= d && d < 1600 ) return 'lodd-at-aqua';
	if ( 1600 <= d && d < 2000 ) return 'lodd-at-blue';
	if ( 2000 <= d && d < 2400 ) return 'lodd-at-yellow';
	if ( 2400 <= d && d < 2800 ) return 'lodd-at-orange';
	if ( 2800 <= d ) return 'lodd-at-red';
	return '';
};

const insertAfter = (x, y) => {
	if ( y.parentNode.lastChild == y ) {
		y.parentNode.appendChild(x);
	} else {
		y.parentNode.insertBefore(x, y.nextSibling);
	}
};

const get_element = () => {
	ele = undefined;
	const id = setInterval(() => {
		if ( ele === undefined ) {
			const e = document.querySelector('#app > div.main-container > main > div > section.side > div:nth-child(1) > div > div:nth-child(4) > span:nth-child(1) > span');
			if ( e !== undefined && e !== null ) {
				const ee = e.parentNode.parentNode.cloneNode(true);
				ee.children[0].children[0].innerHTML = '原始难度';
				ele = ee.children[1];
				ele.innerHTML = '获取中';
				insertAfter(ee, e.parentNode.parentNode);
				upd_dif();
				clearInterval(id);
			}
		}
	}, 100);
};
const get_difficulty = () => {
	dif = cla = undefined;
	if ( /^https:\/\/www\.luogu\.com\.cn\/problem\/\w+/.test(location.href) ) {
		const url = location.href.substr(33);
		const rcf = /^CF(\d+)([A-Z]\d*)(#\w+)?$/, rat = /^AT_(\w+)(#\w+)?$/;
		var res;
		if ( ( res = rcf.exec(url) ) !== null ) {
			const cid = res[1], pid = res[2];
			GM_xmlhttpRequest({
				method: 'GET',
				url: 'https://codeforces.com/api/contest.standings?from=1&count=1&contestId=' + cid,
				onload: res => {
					const data = JSON.parse(res.responseText);
					if ( data.status !== 'OK' ) {
						dif = '获取失败';
						cla = '';
						upd_dif();
						return;
					}
					for ( var pro of data.result.problems ) {
						if ( pro.index === pid ) {
							if ( pro.rating === undefined ) {
								dif = '暂无难度';
								cla = '';
							} else {
								dif = pro.rating;
								cla = get_cf_class(pro.rating);
							}
							upd_dif();
							return;
						}
					}
					dif = '获取失败';
					cla = '';
					upd_dif();
					return;
				},
				onerror: () => {
					dif = '获取失败';
					cla = '';
					upd_dif();
					return;
				}
			});
		} else if ( ( res = rat.exec(url) ) !== null ) {
			const pid = res[1];
			GM_xmlhttpRequest({
				method: 'GET',
				url: 'https://kenkoooo.com/atcoder/resources/problem-models.json',
				onload: res => {
					const data = JSON.parse(res.responseText);
					const pro = data[pid];
					if ( pro !== undefined ) {
						if ( pro.difficulty === undefined ) {
							dif = '暂无难度';
							cla = '';
						} else {
							dif = pro.difficulty;
							cla = get_at_class(pro.difficulty);
						}
						upd_dif();
						return;
					}
					dif = '获取失败';
					cla = '';
					upd_dif();
					return;
				},
				onerror: () => {
					dif = '获取失败';
					cla = '';
					upd_dif();
					return;
				}
			});
		}
	}
};

const main = () => {
	const es = document.createElement('style');
	es.innerText = style_string;
	document.head.appendChild(es);
	get_difficulty();
	get_element();
};

const wrapper = t => {
	const orig = history[t];
	return function () {
		const ret = orig.apply(this, arguments);
		const e = new Event(t);
		e.arguments = arguments;
		dispatchEvent(e);
		return ret;
	};
};
history.pushState = wrapper('pushState');
addEventListener('pushState', main);
addEventListener('popstate', main);
addEventListener('ononline', get_difficulty);
main();