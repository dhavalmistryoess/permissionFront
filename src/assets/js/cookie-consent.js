jQuery(function(e){function o(){var o=c("cookies_consent");(null==o||""==o||void 0==o)&&e("#cookie_directive_container").show()}function n(o,n,c){var i=new Date
i.setDate(i.getDate()+c)
var t=escape(n)+(null==c?"":"; expires="+i.toUTCString())
document.cookie=o+"="+t+"; path=/",e("#cookie_directive_container").hide("slow")}function c(e){var o,n,c,i=document.cookie.split(";")
for(o=0;o<i.length;o++)if(n=i[o].substr(0,i[o].indexOf("=")),c=i[o].substr(i[o].indexOf("=")+1),n=n.replace(/^\s+|\s+$/g,""),n==e)return unescape(c)}o(),e("#cookie_accept a.close_cookie").click(function(){n("cookies_consent",1,30)})})
