// ==UserScript==
// @name TS+
// @description Better Teamspeak
// @author Bluscream
// @version 1.4.1
// @encoding utf-8
// @icon http://www.teamspeak.com/favicon.ico
// @homepage https://r4p3.net
// @contactURL https://r4p3.net/members/bluscream.53/
// @supportURL https://github.com/R4P3-NET/BetterTS/issues/new
// @contributionURL https://github.com/R4P3-NET/BetterTS/compare
// @updateURL https://cdn.rawgit.com/R4P3-NET/BetterTS/master/TS%2B.user.js
// @downloadURL https://github.com/R4P3-NET/BetterTS/raw/master/TS%2B.user.js
// @require https://raw.githubusercontent.com/brandonaaron/livequery/1.1.1/jquery.livequery.js
// @require https://cdn.rawgit.com/ali-saleem/anchorme.js/gh-pages/anchorme.min.js
// @include *.teamspeak.com/*
// @include *.teamspeakusa.com/*
// @grant unsafeWindow
// ==/UserScript==
/*jshint multistr: true */




(function() {
    'use strict';
    //if([window.location.href].startsWith("https://")) { window.location.href = [window.location.href].replace("https://", "http://"); }
    $( document ).ready(function() {
        $('head').append('<link rel="stylesheet" href="https://rawgit.com/R4P3-NET/BetterR4P3/master/css/main.css" type="text/css" />');
        if (localStorage.getItem("theme") == 1) {
            $('head').append('<link rel="stylesheet" href="https://cdn.rawgit.com/R4P3-NET/BetterR4P3/master/css/dark.css" type="text/css" />');
        }
    });
})();
