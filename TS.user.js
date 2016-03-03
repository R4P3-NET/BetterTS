// ==UserScript==
// @name TS+
// @description Better Teamspeak
// @author Bluscream
// @version 1.2
// @encoding utf-8
// @icon http://www.teamspeak.com/favicon.ico
// @homepage https://r4p3.net
// @contactURL https://r4p3.net/members/bluscream.53/
// @supportURL https://github.com/R4P3-NET/BetterTS/issues/new
// @contributionURL https://github.com/R4P3-NET/BetterTS/compare
// @updateURL https://cdn.rawgit.com/R4P3-NET/BetterTS/master/TS%2B.user.js
// @downloadURL https://github.com/R4P3-NET/BetterTS/raw/master/TS%2B.user.js
// @require https://code.jquery.com/jquery-2.2.1.min.js
// @require https://raw.githubusercontent.com/meetselva/attrchange/master/js/attrchange.js
// @require https://raw.githubusercontent.com/brandonaaron/livequery/1.1.1/jquery.livequery.js
// @include *forum.teamspeak.com/*
// @grant unsafeWindow
// ==/UserScript==
/*jshint multistr: true */
js_addItem = function(parent, html, before) {
    if(before){ $(parent).before(html); }else{ $(parent).after(html); }
};
js_insertItem = function(parent, html, prepend) {
    if(prepend){ $(parent).prepend(html); }else{ $(parent).append(html); }
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

(function() {
    'use strict';
    $( document ).ready(function() {
        $('head').append('<link rel="stylesheet" href="https://rawgit.com/R4P3-NET/BetterTS/master/css/main.css" type="text/css" />');
        if (localStorage.getItem("theme") == 1) {
            $('head').append('<link rel="stylesheet" href="https://cdn.rawgit.com/R4P3-NET/BetterTS/master/css/dark.css" type="text/css" />');
        }
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
        if(window.location.href == "http://forum.teamspeak.com/register.php"){
            var rand1 = Math.floor(Math.random() * (9999999999- 1000 + 1)) + 1000;
            var rand2 = Math.floor(Math.random() * (9999999999- 1000 + 1)) + 1000;
            $('#regusername').val(rand1);
            var pw = localStorage.getItem('defaultpw');
            if(pw){
                $('#password').val(pw);$('#passwordconfirm').val(pw);
            }else{
                $('#password').val('R3P4.NET!');$('#passwordconfirm').val('R3P4.NET!');
            }
            $('#email').val(rand1+'@'+rand2+'.com');$('#emailconfirm').val(rand1+'@'+rand2+'.com');
            $('#bd_month').val('01');$('#bd_day').val('01');$('#bd_year').val('1988');
            $('#showbirthday').val('0');
            $('#cb_adminemail').prop('checked', false);$('#cb_rules_agree').prop('checked', true);
            $('iframe[src^="https://www.google.com/recaptcha/').livequery(function(){
                $('iframe[src^="https://www.google.com/recaptcha/').contents().find('.recaptcha-checkbox-checkmark').click();
            });
        }
    });
})();
