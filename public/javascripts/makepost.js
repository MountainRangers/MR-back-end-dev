$(document).ready(function() {
  navigator.geolocation.getCurrentPosition(function(position){
  });

  $('[data-js~=submit-button]').on('click', function(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(sendPost);
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
    success: function(data) {
      location.pathname = '/timeline';
    },
    error: function(error) {
      console.log(error);
    }
  });
}
