$(document).ready(function() {
  $('.display-name').hide();
  $('display-name').show(500);
  var $postForm = $('.create-post-form');
  var $hikeTitle = $('.title-input');
  var $hikeBody = $('.body-input');
  var $submitButton = $('.submit-button');
  $submitButton.on('click', function(event) {
    event.preventDefault();
    var $postTag = $('input[type="radio"]:checked').val();
    console.log($postTag);
    var postObject = {};
    $.ajax({
      url: '/addpost',
      method: 'POST',
      data: {
        title: $hikeTitle.val(),
        body: $hikeBody.val(),
        tag: $postTag
      },
      success: function(data) {
        console.log('success');
        // console.log($postTag);
        location.pathname = '/timeline';
      },
      error: function() {
        console.error('failed to make post');
      }
    });
  });
})
