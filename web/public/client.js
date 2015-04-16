$(function(){

  var input = "";
  $(document).keypress(function(key) {
    if (key.which === 13) {
      post($('input').val());
    }
  });

  var post = function(value) {
    $.ajax({
      url: 'http://127.0.0.1:8080',
      type: 'POST',
      data: value,
      contentType: 'text/plain',
      success: function (data) {
        console.log('chatterbox: Message sent');
        console.log('Data: ', data);

        if (data.Location) {
            // data.redirect contains the string URL to redirect to
            window.location.href = data.Location;
        }
      },
      error: function (data) {
        console.error('chatterbox: Failed to send message');
      }
    });
  }



});
