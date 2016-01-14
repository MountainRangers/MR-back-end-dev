$(document).ready(function() {
//  $('.display-name').hide();
//  $('display-name').show(500);
//  if(navigator.geolocation){
//    console.log('navigation supported by browser');
//  }
    navigator.geolocation.getCurrentPosition(function(position){
    });
  
  $('.submit-button').on('click', function(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(sendPost)
  });
});

function sendPost(position){
  $.ajax({
    url: '/addpost',
    method: 'POST',
    data: {
      title: $('.title-input').val(),
      body: $('.body-input').val(),
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      tag: $('input[type="radio"]:checked').val()
    },
    success: function() {
      location.pathname = '/timeline';
    },
    error: function() {
      console.error('failed to make post');
    }
  });
}
