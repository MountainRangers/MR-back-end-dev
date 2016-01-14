$(document).ready(function(){
  $('.display-name').hide();
  $('display-name').show(500);
  var $postForm = $('.create-post-form');
  var $hikeTitle = $('.title-input');
  var $hikeBody = $('.body-input');
  var $submitButton = $('.submit-button');
  $submitButton.on('click', function(event){
    event.preventDefault();
    var postObject = {};
    $.ajax({
      url: '/addpost',
      method: 'POST',
      data: {newpost: 
              {
                title: $hikeTitle.val(),
                body: $hikeBody.val()
              }
            },
      success: function(data){
        console.log('success')
        location.pathname = '/profile/' + data.id;
      },
      error: function(){
        console.error('failed to make post');
      }
    });
  }); 
})
