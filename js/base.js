/**
 * @author Mack
 */

//(function($) {

$(document).ready(function() {

    var SCROLL_TIME = 1000;
    //var pageWidth = $(window).width() || 1000;
    var pageWidth = document.documentElement.clientWidth || window.innerWidth || window.document.documentElement.clientWidth || window.outerWidth;
    var g_container = document.getElementById("global_container");
    
    console.log(" width =  " + pageWidth);
    g_container.style.width = pageWidth * 0.8 + "px";
    
    

});

var fadeData =  [
	[500, false, "#img01"],
	[1500, false, "#img02_01"],
	[2500, false, "#img02_02"],
	[3500, false, "#img02_03"],
	[4500, false, "#img03_01"],
	[5500, false, "#img03_02"],
	[6500, false, "#img03_03"]
]

alert(fadeData.length);

window.onscroll = function() {
	var scroll = document.body.scrollTop || document.documentElement.scrollTop;
	var rate;
	console.log("scroll = " + scroll);
	
	for(var i=0; i < fadeData.length; i++) {
		if ((scroll > fadeData[i][0]) && !fadeData[i][1]) {
	    	console.log("scroll = " + scroll + "  rate :  " + rate);
	    	fadeData[i][1] = true;
			$(fadeData[i][2]).fadeTo(1000, 0.0, function() { console.log("ok");}) ;    		
		}
		else if ((scroll < fadeData[i][0]) && fadeData[i][1]) {
	    	console.log("scroll = " + scroll + "  rate :  " + rate);
	    	fadeData[i][1] = false;
			$(fadeData[i][2]).fadeTo(1000, 1.0, function() { console.log("ok");}) ;    		
		}
		
	}
}

//})(jQuery);
