console.log("Success!");
$(document).ready(function() {
  $deletePost = $('.single-post-delete-container').find('h3');
  $postId = $('.single-post-delete-container').attr('id');
  $deletePost.on('click', function(event) {
    $.ajax({
      url: '/post/' + $postId,
      method: 'DELETE',
      success: function() {
        location.pathname = '/timeline';
      },
      error: function(data) {
        console.error('delete post failed');
      }
    });
  });
});
