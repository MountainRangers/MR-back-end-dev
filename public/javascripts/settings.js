$(document).ready(function(){
  $changename = $('.change-name');
  $changepersonalinfo = $('.change-personal-info');
  $main = $('main');
  
  //Attach Click Handlers
  //$changename.on('click', function(event){
  //  editInfo($changename);
  //});
  $changepersonalinfo.on('click', function(){
    editInfo($changepersonalinfo);
  });
});

//Is user changing or submitting info?
function editInfo(info){
  var $changetext = info.text();
    console.log('current text is ', $changetext);
    if(info.text() == 'Change'){
      changeInfo(info);
    } else if (info.text() == 'Submit'){
      submitChange(info);
    }
}

//DOM manipulation when user presses 'Change'
function changeInfo(info){
  var $dataNearButton = info.parent('.edit-settings').find('h2');
  var $inputNearButton = info.parent('.edit-settings').find('.hidden');
  $dataNearButton.hide();
  $inputNearButton.val($dataNearButton.text());
  $inputNearButton.show();
  info.text('Submit');
  tapToCancel($main);
}


//DOM manipulation when user presses 'Submit'
function submitChange(submit){
  var $dataNearButton = submit.parent('.edit-settings').find('h2');
  var $inputNearButton = submit.parent('.edit-settings').find('.hidden');
  var personalinfo = $inputNearButton.val();
  console.log('submitted');
  $('.hidden').hide();
  $dataNearButton.show();
  submit.text('Change');
  $.ajax({  
    url: '/makeprofile',
    method: 'PUT',
    data: {userinfo: personalinfo},
    success: function(data){
      location.reload();
    },
    error: function(data){
      console.error('profile update failed');
    }
  });
}

//Tap outside of input box to cancel changes in progress
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
