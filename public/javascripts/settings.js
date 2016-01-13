$(document).ready(function(){
  $changename = $('.change-name');
  $changepersonalinfo = $('.change-personal-info');
  $main = $('main');
  
  $changename.on('click', function(event){
    if($changename.text() == 'Change'){
      editInfo($changename);
    }
    if($changename.text() == 'Submit'){
      submitChange($changename);
    }
  });
  
  $changepersonalinfo.on('click', function(){
    if($changepersonalinfo.text() == 'Change'){
      editInfo($changepersonalinfo);
    }
    if($changepersonalinfo.text() == 'Submit'){
      submitChange($changepersonalinfo);
    }
  });
});

function editInfo(info){
  var $dataNearButton = info.parent('.edit-settings').find('h2');
  var $inputNearButton = info.parent('.edit-settings').find('.hidden');
  $dataNearButton.hide();
  $inputNearButton.val($dataNearButton.text());
  $inputNearButton.show();
  info.text('Submit');
  tapToCancel($main);
}


function submitChange(submit){
  submit.on('click', function(){
    console.log('submitted');
    //$.post('/makeprofile', function(data){
    // ajax request 
    //})
    $('.hidden:visible').hide();
    submit.parent('.edit-settings').find('h2').show();
    submit.text('Change');
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
