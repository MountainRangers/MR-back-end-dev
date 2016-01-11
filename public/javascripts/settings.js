//if(jQuery)console.log('jQ loadded');
$changename = $('.change-name');
$changeemail = $('.change-email');
$changesocialmedia = $('.change-social-media');
$changepersonalinfo = $('.change-personal-info');

$changename.on('click', function(){
  editInfo($changename.parents('.edit-settings').find('h2').text());
});

$changeemail.on('click', function(){
  editInfo($changeemail.parents('.edit-settings').find('h2').text());
});

$changesocialmedia.on('click', function(){
  editInfo($changesocialmedia.parents('.edit-settings').find('h2').text());
});

$changepersonalinfo.on('click', function(){
  editInfo($changepersonalinfo.parents('.edit-settings').find('h2').text());
});

function editInfo(info){
  console.log('you clicked ' + info);
}
