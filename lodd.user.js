// ==UserScript==
// @name         Luogu Original Difficulty Display
// @version      4.0
// @description  Luogu original difficulty display
// @author       cmk666
// @match        https://www.luogu.com.cn/*
// @connect      codeforces.com
// @connect      kenkoooo.com
// @icon         https://www.google.com/s2/favicons?sz=64&domain=luogu.com.cn
// @grant        GM_xmlhttpRequest
// ==/UserScript==
"use strict";!function(){var o,e,n,d="#app>div.main-container>main>div>section.side>div:nth-child(1)>div>div:nth-child(5)>span:nth-child(1)>span",t=function(){void 0!==o&&void 0!==e&&void 0!==n&&(n.innerText=o,""!==e&&n.classList.add(e))},r=function(o){return o<1200?"lodd-cf-gray":1200<=o&&o<1400?"lodd-cf-green":1400<=o&&o<1600?"lodd-cf-cyan":1600<=o&&o<1900?"lodd-cf-blue":1900<=o&&o<2100?"lodd-cf-purple":2100<=o&&o<2400?"lodd-cf-orange":2400<=o&&o<3e3?"lodd-cf-red":3e3<=o?"lodd-cf-blackred":""},l=function(o){return o<400?"lodd-at-gray":400<=o&&o<800?"lodd-at-brown":800<=o&&o<1200?"lodd-at-green":1200<=o&&o<1600?"lodd-at-aqua":1600<=o&&o<2e3?"lodd-at-blue":2e3<=o&&o<2400?"lodd-at-yellow":2400<=o&&o<2800?"lodd-at-orange":2800<=o?"lodd-at-red":""},i=function(o,e){e.parentNode.lastChild==e?e.parentNode.appendChild(o):e.parentNode.insertBefore(o,e.nextSibling)},a=function(o){if(/^\/problem\/\w+/.test(o)){var e=o.substr(9);return/^CF\d+[A-Z]\d*(#\w+)?$/.test(e)||/^AT_\w+(#\w+)?$/.test(e)}return!1},c=function(o){if(n=void 0,a(o))var e=setInterval(function(){if(void 0===n){var o=document.querySelector(d);if(null===o||"原始难度"!==o.innerText){var r=document.querySelector("#app>div.main-container>main>div>section.side>div:nth-child(1)>div>div:nth-child(4)>span:nth-child(1)>span");if(void 0!==r&&null!==r){var l=r.parentNode.parentNode.cloneNode(!0);l.children[0].children[0].innerHTML="原始难度",n=l.children[1],n.innerHTML="获取中",i(l,r.parentNode.parentNode),t(),clearInterval(e)}}}},100)},f=function(n){if(o=e=void 0,a(n)){var d=n.substr(9),i=void 0;if(null!==(i=/^CF(\d+)([A-Z]\d*)(#\w+)?$/.exec(d))){var c=i[1],f=i[2];GM_xmlhttpRequest({method:"GET",url:"https://codeforces.com/api/contest.standings?from=1&count=1&contestId="+c,onload:function(n){var d=JSON.parse(n.responseText);if("OK"!==d.status)return o="获取失败",e="",void t();var l=!0,i=!1,a=void 0;try{for(var c,u=d.result.problems[Symbol.iterator]();!(l=(c=u.next()).done);l=!0){var s=c.value;if(s.index===f)return void 0===s.rating?(o="暂无难度",e=""):(o=s.rating,e=r(s.rating)),void t()}}catch(o){i=!0,a=o}finally{try{!l&&u.return&&u.return()}finally{if(i)throw a}}o="获取失败",e="",t()},onerror:function(){o="获取失败",e="",t()}})}else if(null!==(i=/^AT_(\w+)(#\w+)?$/.exec(d))){var u=i[1];GM_xmlhttpRequest({method:"GET",url:"https://kenkoooo.com/atcoder/resources/problem-models.json",onload:function(n){var d=JSON.parse(n.responseText),r=d[u];if(void 0!==r)return void 0===r.difficulty?(o="暂无难度",e=""):(o=r.difficulty,e=l(r.difficulty)),void t();o="获取失败",e="",t()},onerror:function(){o="获取失败",e="",t()}})}}},u=function(o){var e=document.createElement("style");e.innerText=".lodd-cf-gray{font-weight:bold;color:gray;}.lodd-cf-green{font-weight:bold;color:green;}.lodd-cf-cyan{font-weight:bold;color:#03a89e;}.lodd-cf-blue{font-weight:bold;color:blue;}.lodd-cf-purple{font-weight:bold;color:#a0a;}.lodd-cf-orange{font-weight:bold;color:darkorange;}.lodd-cf-red,.lodd-cf-blackred{font-weight:bold;color:red;}.lodd-cf-blackred:first-letter{font-weight:bold;color:black;}.lodd-at-gray{font-weight:bold;color:gray;}.lodd-at-brown{font-weight:bold;color:#804000;}.lodd-at-green{font-weight:bold;color:green;}.lodd-at-aqua{font-weight:bold;color:#00c0c0;}.lodd-at-blue{font-weight:bold;color:blue;}.lodd-at-yellow{font-weight:bold;color:#c0c000;}.lodd-at-orange{font-weight:bold;color:#ff8000;}.lodd-at-red{font-weight:bold;color:red;}",document.head.appendChild(e);var n=document.querySelector(d);if(null!==n&&"原始难度"===n.innerText){var t=n.parentNode.parentNode;t.parentNode.removeChild(t)}f(o),c(o)},s=unsafeWindow.console.info;Object.defineProperty(unsafeWindow.console,"info",{set:function(o){console.warn("Some script is trying to modify `unsafeWindow.console.info`. Maybe SB exlg?"),s=o},get:function(){return function(){"[@lfe/loader]"===(arguments.length<=0?void 0:arguments[0])&&"Navigated"===(arguments.length<=1?void 0:arguments[1])&&u(arguments.length<=2?void 0:arguments[2]),s.apply(void 0,arguments)}}}),addEventListener("ononline",f),u(location.pathname)}();