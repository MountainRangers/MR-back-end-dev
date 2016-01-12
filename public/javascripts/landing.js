$(document).ready(function(){
  $('.google-button').mouseover(function(){
    $('.shape-one').css('stroke', 'white')
    $('.shape-two').css('stroke', 'white')
  })
})

$(document).ready(function(){
	setInterval(function(){
		var now = new Date();
		var hours = now.getHours();
		var minutes = now.getMinutes();
		if (hours < 10) {
			hours = "0" + hours;
		}
		if (minutes < 10) {
			minutes = "0" + minutes;
		}
		if (hours > 12){
			var hours = hours - 12;
			var ap = "p";
		}else if (hours == 12) {
			var ap = "p";
		}else if (hours == 24) {
			var hours = hours - 12;
			var ap = "a";
		}else {
			var ap = "a";
		}
		document.getElementById('clock').innerHTML = hours + ":" + minutes + ap;
	}, 1000);
});
$(".cont").ready(function(){
	setInterval(function(){
		var height = $(".foreground").height();
		var top = $(".foreground").height();
		var div = $(window).width();
	}, 0.01);
});

//color settings
$(document).ready(function(){
	setInterval(function(){
		var dawn = '#78d';
		var day = '#1bf';
		var dusk = '#036';
		var mood = new Date();
		var second = mood.getSeconds();
		if(second < 10){
			$('body').css('background', dawn);
			$('.shape-one').css('fill', dawn);
			$('.sky-dawn').css('opacity','1');
			$('.sky-day').css('opacity','1');

		} else if(second < 40) {
			$('body').css('background', day);
			$('.shape-one').css('fill', dawn);
			$('.sky-dawn').css('opacity','0');
			$('.sky-day').css('opacity','1');
		} else {
			$('body').css('background', dusk);
			$('.trees').css('fill', dusk);
			$('.sky-day').css('opacity','0');
			$('.hills').css('fill','#0be');
		}
	});
});