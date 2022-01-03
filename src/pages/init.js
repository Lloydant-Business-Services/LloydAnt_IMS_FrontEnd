//jQuery time
import $ from "jquery";

export function initForm(){


var current_fs, next_fs, previous_fs; //sections
var left, opacity, scale; //section properties which we will animate
var animating; //flag to prevent quick multi-click glitches

$(".next").click(function(){
	
	current_fs = $(this).parent();
	next_fs = $(this).parent().next();
	
	$("#progressbar li").eq($("section").index(next_fs)).addClass("active");
	var wid = $(window).width();
	//alert(wid)

	
	//show the next section
	next_fs.show(); 
	window.scrollTo(0, 0)

	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			scale = 1 - (1 - now) * 0.2;
			if(wid > 800){
				left = 14+"%";
			}
			else{
				left = (now * 50)+"%";
			}
			
			opacity = 1 - now;
			current_fs.css({'transform': 'scale('+scale+')'});
			next_fs.css({'left': left, 'opacity': opacity});
		}, 
		duration: 200,
	});
});

$(".previous").click(function(){

	current_fs = $(this).parent();
	previous_fs = $(this).parent().prev();
	
	$("#progressbar li").eq($("section").index(current_fs)).removeClass("active");
	
	previous_fs.show(); 
	window.scrollTo(0, 0)
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			scale = 0.8 + (1 - now) * 0.2;
			left = ((1-now) * 50)+"%";
			opacity = 1 - now;
			current_fs.css({'left': left});
			previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
		}, 
		duration: 200, 
		complete: function(){
			current_fs.hide();
			animating = false;
		}
	});
});

$(".submit").click(function(){
	return false;
})
}