/**
 * @author Mack
 */

//(function($) {

$(document).ready(function() {

    var SCROLL_TIME = 1000;
    //var pageWidth = $(window).width() || 1000;
    var pageWidth = document.documentElement.clientWidth || window.innerWidth || window.document.documentElement.clientWidth || window.outerWidth;
    var g_container = document.getElementById("global_container");
    
    setData();
});

function Contents(elem, initial_page, final_page, initial_pos, final_pos) {	
	this.initial_page = initial_page;
	this.final_page = final_page;
	this.initial_pos = initial_pos;	
	this.final_pos = final_pos;
	this.current = [];

	this.speed = [];
	this.speed[0] = ((final_page + final_pos[0]) - (initial_page + initial_pos[0])) / (final_page - initial_page);
	this.speed[1] = (final_pos[1] - initial_pos[1]) / (final_page - initial_page);
	
	this.begining = [];
	this.begining[0] = (initial_page + initial_pos[0]) - (this.speed[0] * initial_page);
	this.begining[1] = this.initial_pos[1];
	
	this.elem = elem;
	this.elem.style.top = parseInt(this.begining[0]) + "px";
	this.elem.style.left = parseInt(this.begining[1]) + "px";
	
	this.scrolling = function(scrollx) {
		this.out();
		this.current[0] = this.begining[0] + (this.speed[0] * scrollx);
		this.current[1] = this.begining[1] + (this.speed[1] * scrollx);
		
		this.elem.style.top = parseInt(this.current[0]) + "px";
		this.elem.style.left = parseInt(this.current[1]) + "px";
	}
	
	this.out = function() {
		var str = "";
		str += "  top=" + this.elem.style.top + "  ";
		str += "  left=" +  this.elem.style.left + "  ";
		str += "  scroll=" + pre_scroll;
		str += "  initial_pos=" + this.initial_pos[0] + "  ";
		str += "  initial_pos=" + this.final_pos[0] + "  ";
		str += "  speed=" + this.speed[0] + "  ";

		console.log( str);
	}
}

var pre_scroll = -1; /* 前のイベントでのスクロール値 */
window.onscroll = function() {
	var scroll = document.body.scrollTop || document.documentElement.scrollTop;
	var rate;
	
	if (scroll > pre_scroll) {	// 下に向かっている 
		for(var i=1; i < fadeData.length; i++) {
			if ((scroll > fadeData[i][0]) && !fadeData[i][1]) {
		    	fadeData[i][1] = true;
				$(fadeData[i][2]).fadeTo(1000, 0.0, function() { }) ;
			}
		}

		if ((scroll > fadeData[0][0]) && !fadeData[0][1]) {
	    	fadeData[0][1] = true;
			//$(fadeData[0][2]).fadeTo(1000, 0.0, function() { $("#myheader").slideDown(10000); }) ;
			$(fadeData[0][2]).fadeTo(1000, 0.0, function() { $("#myheader").slideDown('normal', 'swing'); }); //なぜかcssで min-width, min-heightを指定すると動かない。
		}
		
	} else { //上に向かっている
		for(var i=1; i < fadeData.length; i++) {
			if ((scroll < fadeData[i][0]) && fadeData[i][1]) {
		    	fadeData[i][1] = false;
				$(fadeData[i][2]).fadeTo(1000, 1.0, function() { }) ;    		
			}    		
		}
	}
	pre_scroll = scroll;
	
	obj1.scrolling(scroll);
	obj2.scrolling(scroll);
}

var obj1, obj2;
function setData() {
	obj1 = new Contents(document.getElementById("elem1"), 500, 1500, [300, 250], [0, 250]);
	obj2 = new Contents(document.getElementById("elem2"), 500, 1500, [700, 600], [-100, 600]);
	
	obj1.out();
}

var fadeData =  [
	[500, false, "#img01"],
	[1000, false, "#img02_01"],
	[1500, false, "#img02_02"],
	[2000, false, "#img02_03"],
	[2500, false, "#img03_01"],
	[3000, false, "#img03_02"],
	[3500, false, "#img03_03"]
]


function slider() {
	$("#myheader").slideDown(2000, 'swing');
	$("#elem1").css("display", "none");
	$("#elem1").slideDown(2000, 'swing');
}
	
//})(jQuery);
