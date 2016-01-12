//if(jQuery)console.log('jQ loadded');
$changename = $('.change-name');
$changeemail = $('.change-email');
$changesocialmedia = $('.change-social-media');
$changepersonalinfo = $('.change-personal-info');
$main = $('main');
//$submit = $('.edit settings h3');

$changename.on('click', function(){
  editInfo($changename);
});

$changeemail.on('click', function(){
  editInfo($changeemail);
});

$changesocialmedia.on('click', function(){
  editInfo($changesocialmedia);
});

$changepersonalinfo.on('click', function(){
  editInfo($changepersonalinfo);
});

function editInfo(info){
  info.parents('.edit-settings').find('h2').hide();
  info.parents('.edit-settings').find('.hidden').show();
  var $submitButton = info.parents('.edit-settings').find('h3');
  $submitButton.text('Submit');
  submitChange($submitButton);
  tapToCancel($main);
}

function submitChange(submit){
  submit.on('click', function(){
    console.log('submitted');
    //ajax request
  })
}

function tapToCancel(main){
  main.on('click', function(event){
    if(event.target === this){
      console.log('hide it');
      $('.hidden:visible').hide();
      main.find('.edit-settings').find('h2').show();
      main.find('.edit-settings').find('h3').text('Change');
    }
  })
}
