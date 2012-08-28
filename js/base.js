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
    
    setData();
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
	obj1.scrolling(scroll);
	obj2.scrolling(scroll);
}

function Contents(elem, initial_page, final_page, initial_pos, final_pos) {	
	this.initial_page = initial_page;
	this.final_page = final_page;
	this.initial_pos = initial_pos;	
	this.final_pos = final_pos;

	this.speed = [];
	this.speed[0] = (final_pos[0] - initial_pos[0]) / (final_page - initial_page);
	this.speed[1] = (final_pos[1] - initial_pos[1]) / (final_page - initial_page);
	
	this.elem = elem;
	this.elem.style.top = parseInt((initial_page + initial_pos[0]) - (this.speed[0] * initial_page)) + "px";
	this.elem.style.left = parseInt(this.initial_pos[1]) + "px";
	
	this.scrolling = function(scrollx) {
		this.elem.style.top = parseInt((initial_page + initial_pos[0]) + (this.speed[0] * scrollx)) + "px";
		this.elem.style.left = parseInt(this.initial_pos[1] + (this.speed[1] * scrollx)) + "px";
		this.out();
	}
	
	this.out = function() {
		var str = "";
		str += "initial_pos  " + this.initial_pos[0] + "  ";
		str += "initial_pos  " + this.final_pos[0] + "  ";
		str += "speed  " + this.speed[0] + "  ";
		str += "top  " + this.elem.style.top + "  ";
		str += "left  " +  this.elem.style.left + "  ";
		console.log(i + "  " + str);
	}
}

var obj1, obj2;
function setData() {
	obj1 = new Contents(document.getElementById("elem1"), 500, 3500, [400, 250], [100, 230]);
	obj2 = new Contents(document.getElementById("elem2"), 500, 3500, [600, 600], [400, 620]);
	
	obj1.out();
}

//})(jQuery);
