
  var input = "";
  $(document).keydown(function(key) {
    if (key.which === 13) {
      post($('input').val());
    }
  });

  var post = function(value) {
    $.ajax({
      url: 'http://127.0.0.1:8080/sites/',
      type: 'POST',
      data: value,
      contentType: 'text/plain',
      success: function (chunk) {
        console.log("data: ", chunk);

        $(body).append(chunk);
        // console.log("data body: ", chunk.body);
        // window.location.href = chunk;
      },
      error: function (data) {
        console.error('chatterbox: Failed to send message');
      }
    });
  }
