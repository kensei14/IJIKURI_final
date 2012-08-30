/**
 * @author Mack
 */

//(function($) {

$(document).ready(function() {

    //var pageWidth = $(window).width() || 1000;
    var pageWidth = document.documentElement.clientWidth || window.innerWidth || window.document.documentElement.clientWidth || window.outerWidth;
    var pageHeight = document.documentElement.clientHeight || window.innerHeight || window.document.documentElement.clientHeight || window.outerHeight;
    var screenWidth = window.outerWidth;
    var screenHeight = window.outerHeight;

    var logo = $("#logo");
    var logo_width = pageWidth * 0.25;
    //logo.css("height", parseInt(pageHeight * 0.4) + "px");
    logo.css("width", parseInt(logo_width) + "px");
    logo.css("height", "auto");
    logo.css("left", parseInt(pageWidth/2 - logo_width/2) + "px");
    logo.css("top", parseInt(pageHeight * 0.2) + "px");

	$("#global_container").fadeTo(1000, 1.0, function() { });
	
    var a_elems = document.getElementsByTagName("a");    
    for(var i=0; i < a_elems.length; i++) {
    	a_elems[i].addEventListener("click", scrollToAnchor, false);
    }
    
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
			$("#logo").fadeTo(1000, 0.0, function() {});
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
	obj3.scrolling(scroll);
	obj4.scrolling(scroll);
}

function scrollToAnchor(event) {	
	event.preventDefault();

	var anchor  = $(this).attr('href');
	switch(anchor) {
		case '#About':
			scrollTo(0, 510);
			break;
		case '#Members':
			scrollTo(0, 2010);
			break;
		case '#Works':
			scrollTo(0, 3000);
			break;
		case '#Contact':
			break;
		default :
			break;
	}
						
	return false;
}

var obj1, obj2, obj3, obj4;
function setData() {
	obj1 = new Contents(document.getElementById("elem1"), 500, 1500, [300, 250], [0, 250]);
	obj2 = new Contents(document.getElementById("elem2"), 500, 1500, [700, 600], [300, 600]);
	obj3 = new Contents(document.getElementById("elem3"), 3500, 4500, [500, 200], [0, 200]);
	obj4 = new Contents(document.getElementById("elem4"), 3500, 4500, [800, 800], [500, 800]);
}

var fadeData =  [
	[500, false, "#img01"],
	[1000, false, "#img02_01"],
	[1500, false, "#img02_02"],
	[3500, false, "#img02_03"],
	[4000, false, "#img03_01"],
	[4500, false, "#img03_02"],
	[6000, false, "#img03_03"]
]
	
//})(jQuery);
