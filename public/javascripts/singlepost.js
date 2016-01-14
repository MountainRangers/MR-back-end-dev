$(document).ready(function() {
  $deletePost = $('[data-js~=delete-post]');
  $postId = $('[data-js~=single-post-delete-container]').attr('id');
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
