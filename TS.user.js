// ==UserScript==
// @name TS+
// @description Better Teamspeak
// @include *teamspeak.com/*
// @version 1.2
// @icon http://www.teamspeak.com/favicon.ico
// @supportURL https://github.com/R4P3-NET/BetterTS/issues/new
// @contributionURL https://github.com/R4P3-NET/BetterTS/compare
// @updateURL https://cdn.rawgit.com/R4P3-NET/BetterTS/master/TS%2B.user.js
// @downloadURL https://github.com/R4P3-NET/BetterTS/raw/master/TS%2B.user.js
// @require https://code.jquery.com/jquery-2.2.1.min.js
// @require https://cdn.rawgit.com/brandonaaron/livequery/1.1.1/jquery.livequery.js
// @require https://cdn.rawgit.com/meetselva/attrchange/master/js/attrchange.js
// @contactURL https://r4p3.net/members/bluscream.53/
// @twitterURL https://twitter.com/R4P3_NET
// @homepage https://r4p3.net
// @author Bluscream
// @encoding utf-8
// ==/UserScript==
/*jshint multistr: true */
//laxcomma
//allow pasting

var regdomain = localStorage.getItem('regdomain');
if(!regdomain){ localStorage.setItem('regdomain', '');}
var regpw = localStorage.getItem('regpw');
if(!regdomain){ localStorage.setItem('regpw', '');}
var tlds = [ 'com', 'de', 'biz', 'org', 'net' ];

js_addItem = function(parent, html, before) {
    if(before){ $(parent).before(html); }else{ $(parent).after(html); }
};
js_insertItem = function(parent, html, prepend) {
    if(prepend){ $(parent).prepend(html); }else{ $(parent).append(html); }
};

//randomNumber(min, max);
randomNumber = function(min, max, s) {
    //return Math.floor(Math.random() * max) + min;
    var result = Math.floor(Math.random() * (max - min + 1)) + min;
    if(s && result.toString().length > 0 && result.toString().length < 2 ){ return "0"+result; }else{ return result; }
};
//randomString(max, numbers);
randomString = function(max, numbers)
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numbers){ possible = possible + "0123456789"; }

    for( var i=0; i < max; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
};

//ts_addNavLink(title, href);
ts_addNavLink = function(title, href, prepend) {
    if(prepend){
        $('.navlinks').prepend('<a href="'+href+'" rel="nofollow">'+title+'</a> | ');
    }else{
        $('.navlinks').append(' | <a href="'+href+'" rel="nofollow">'+title+'</a>');
    }
};
//ts_addUserLink(title, href);
ts_addUserLink = function(title, href, prepend) {
    js_insertItem('#toplinks>ul', '<li><a href="'+href+'">'+title+'</a></li>', prepend);
};
//ts_addNavBarLink(title, href);
ts_addNavBarLink = function(title, href, prepend) {
     js_insertItem('.uk-navbar-nav', '<li><a href="'+href+'"><span>'+title+'</span></a></li>', prepend);
};

//ts_addShoutbox();
ts_addShoutbox = function(src) {
    $('#toplinks>ul>.welcomelink').before('<li><a id="toggleshoutbox" class="noselect" onclick="ts_toggleShoutbox();"><span>Shoutbox</span></a></li>');
    $('#breadcrumb>.floatcontainer').before('<div class="shoutboxouter" id="shoutboxouter"><iframe class="shoutbox" id="shoutbox" WIDTH="100%" HEIGHT="300" title="R4P3 Shoutbox" src="'+src+'" frameborder="0" scrolling="auto"></iframe></div>');
    $('#shoutbox').livequery(function(){
        if (localStorage.getItem("shoutbox") == '0') { $("#shoutbox").hide(); }
        setInterval(function(){ $('#shoutbox').attr('src', $('#shoutbox').attr('src'));console.log('[R4P3+] Refreshed Shoutbox'); }, 30000);
        //$("#toggleshoutbox").click(function(){ ts_checkShoutbox(); });
    });
    $('ts-menu').addClass('noselect-important');
};
//ts_toggleShoutbox();
ts_toggleShoutbox = function() {
    if($('#shoutbox').is(":visible")){
        localStorage.setItem("shoutbox", '0');
    } else {
        localStorage.setItem("shoutbox", '1');
    }
    $('#shoutbox').toggle();
};
//ts_fillRegisterForm(send);
ts_fillRegisterForm = function(send) {
    var rd;var r1 = randomString(14, 1);
    var rtld = tlds[Math.floor(Math.random()*tlds.length)];
    if(!regdomain || regdomain == ""){rd = randomString(9)+"."+rtld;}
    $('#regusername').val(r1);
    if(regpw && regpw != ""){ $('#password').val(pw);$('#passwordconfirm').val(regpw); }else{ $('#password').val('R3P4.NET!');$('#passwordconfirm').val('R3P4.NET!'); }
    if(regdomain && regdomain != ""){ $('#email').val(r1+'@'+regdomain);$('#emailconfirm').val(r1+'@'+regdomain); }else{ $('#email').val(r1+'@'+rd);$('#emailconfirm').val(r1+'@'+rd); }
    $('#bd_month').val(randomNumber(01, 12, 1));$('#bd_day').val(randomNumber(01, 31, 1));$('#bd_year').val(randomNumber(1985, 1999));
    $('#showbirthday').val('0');
    $('#cb_adminemail').prop('checked', false);$('#cb_rules_agree').prop('checked', true);
    $('iframe[src^="https://www.google.com/recaptcha/').livequery(function(){
        $('iframe[src^="https://www.google.com/recaptcha/').contents().find('.recaptcha-checkbox-checkmark').click();
    });
    if(send){$('input[value="Complete Registration"]').click();}
};

(function() {
    'use strict';
    $( document ).ready(function() {
        $('head').append('<link rel="stylesheet" href="https://rawgit.com/R4P3-NET/BetterTS/master/css/main.css" type="text/css" />');
        if (localStorage.getItem("theme") == 1) {
            $('head').append('<link rel="stylesheet" href="https://cdn.rawgit.com/R4P3-NET/BetterTS/master/css/dark.css" type="text/css" />');
        }
        if($('.blockrow.restore').text().indexOf('Sorry - no matches. Please try some different terms.') != -1){ window.location.href = "http://forum.teamspeak.com/index.php"; }
        if($('.blockrow.restore').text().indexOf('Sorry, there are no new posts to view.') != -1){ window.location.href = "http://forum.teamspeak.com/index.php"; }
        $('#redirect_button a').livequery(function(){ $('#redirect_button a').click();console.log('[TS+] Fast redirected...'); });
        //$('.blockrow.restore>ul>li>a[hrefhref="http://forum.teamspeak.com/usercp.php"]').livequery(function(){ $('#redirect_button>a').click();console.log('[TS+] Fast redirected...'); });
        $('#ts-header').addClass('small');
        $("#ts-header").attrchange({
            trackValues: true,
            callback: function(evnt) {
                if(evnt.attributeName == "class") {
                    if(evnt.newValue.search(/small/i) != 1) {
                        $('#ts-header').addClass('small');
                    }
                }
            }
        });
		$('#ts-menu').find('a[href="http://forum.teamspeak.com"]').parent().replaceWith('\
			<li id="community_menu" class="uk-parent" data-uk-dropdown aria-haspopup="true" aria-expanded="false">\
				<a href="https://forum.teamspeak.com"><span>Community</span></a>\
				<div class="uk-dropdown uk-dropdown-navbar">\
					<ul class="uk-nav uk-nav-navbar">\
						<li><a href="search.php?do=getnew&contenttype=vBForum_Post"><span>Unread Posts</span></a></li>\
						<li><a href="search.php?do=getdaily"><span>Daily Posts</span></a></li>\
		             		 </ul>\
		            	</div>\
			</li>\
		');
        ts_addNavBarLink('R4P3', 'https://r4p3.net', 1);
        ts_addNavLink('Unread Posts', 'search.php?do=getnew&contenttype=vBForum_Post');
        ts_addNavLink('Daily Posts', 'search.php?do=getdaily');
        ts_addShoutbox('http://www.freeshoutbox.net/bluscream&');
        if(window.location.href == "http://forum.teamspeak.com/register.php"){ts_fillRegisterForm();}
    });
})();
