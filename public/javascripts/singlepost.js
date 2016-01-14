$(document).ready(function() {
  $deletePost = $('.single-post-delete-container').find('h3');
  $postId = $('.single-post-delete-container').attr('id');
  console.log($postId);
  $deletePost.on('click', function(event) {
    $.ajax({
      url: '/post/' + $postId,
      method: 'DELETE',
      success: function() {
        console.log("Success!");
        location.pathname = '/timeline';
      },
      error: function(data) {
        console.error('delete post failed');
      }
    });
  });
});
