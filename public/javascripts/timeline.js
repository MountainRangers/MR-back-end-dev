if (window.location.href[window.location.href.length - 1] === '#') {
  window.location.href = window.location.href.substring(0, window.location.href.length - 1);
}

$(document).ready(function(){
  $('.down-arrow').on('click', function(){
    $('.drop-down').toggleClass('hidden');
  })

  $('.tl-tag').on('click', function(event) {
    filterTags(event.currentTarget.dataset.tag);
  })

  $('.tag-icon').on('click', function(event) {
    filterTags(event.currentTarget.dataset.tag);
    $('.drop-down').toggleClass('hidden');
  })

  $(window).scroll(
    {
        previousTop: 0
    },
    function () {
    var currentTop = $(window).scrollTop();
    if (currentTop < this.previousTop) {
        $(".tl-header").fadeIn(300);

    } else {
        $(".tl-header").fadeOut(300);
    }
    this.previousTop = currentTop;
});


})

function filterTags(tag) {
  var $posts = $('.post');
  for (var i = 0; i < $posts.length; i++) {
    if (tag === 'all') {
      $posts[i].style.display = '';
    } else {
      if ($posts[i].dataset.tag != tag) {
        $posts[i].style.display = 'none';
      } else {
        $posts[i].style.display = '';
      }
    }
  }
}
