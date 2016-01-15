$(document).ready(function() {
  navigator.geolocation.getCurrentPosition(function(position){
  });

  $('[data-js~=submit-button]').on('click', function(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(sendPost);
  });
});

$(document).on({
  ajaxStart: function() {
    $("body").addClass("loading");
  },
});

function sendPost(position){
  $.ajax({
    url: '/addpost',
    method: 'POST',
    data: {
      title: $('[data-js~=title-input]').val(),
      body: $('[data-js~=body-input]').val(),
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
