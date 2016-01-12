//if(jQuery)console.log('jQ loadded');
$changename = $('.change-name');
$changeemail = $('.change-email');
$changesocialmedia = $('.change-social-media');
$changepersonalinfo = $('.change-personal-info');
$submit = $('.edit settings h3');

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
  info.parents('.edit-settings').find('h3').text('Submit');
}

function submitChange(submit){
  submit.on('click', function(){
    console.log('submitted');
  })
}
