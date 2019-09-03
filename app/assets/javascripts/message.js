
$(function(){
  function buildHTML(message){
    var html = `<div class="right__contents__messagebox">
    <div class="right__contents__messagebox__message--name">
    ${message.user_name}
    </div>
    <div class="right__contents__messagebox__message--date">
    ${message.created_at}
    </div>
    <div class="right__contents__messagebox--text">
    ${message.text}
    <br>
    
    </div>
    <img alt="test" style="margin-top: 10px;" src=${message.image.url} width="200" height="132">
    </div>`
    return html;
  }

  function buildHTML_NoImg(message){
    var html = `<div class="right__contents__messagebox">
    <div class="right__contents__messagebox__message--name">
    ${message.user_name}
    </div>
    <div class="right__contents__messagebox__message--date">
    ${message.created_at}
    </div>
    <div class="right__contents__messagebox--text">
    ${message.text}
    <br>`
    return html;
  }

  function buildHTML_NoText(message){
    var html = `<div class="right__contents__messagebox">
    <div class="right__contents__messagebox__message--name">
    ${message.user_name}
    </div>
    <div class="right__contents__messagebox__message--date">
    ${message.created_at}
    </div>
    <div class="right__contents__messagebox--text">
    <br>
    </div>
    <img alt="test" style="margin-top: 10px;" src=${message.image.url} width="200" height="132">
    </div>`
    return html;
  }

  $('#new_message').on('submit', function(e){
    // preventDefault()を使用してデフォルトのイベントを止めます。
    e.preventDefault();
    var formData = new FormData(this);
    var url = $('#new_message').attr('action');
    // console.log("hi")
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      console.log(data.text)
      console.log(data.image.url)
      if (data.text == null) {
        var html = buildHTML_NoText(data);
      } else if (data.image.url == null) {
        var html = buildHTML_NoImg(data);
      } else {
        var html = buildHTML(data);
      }

      $('.right__contents').append(html);
      $('#message_text').val('');
      $('#message_image').val('');
      //データ受け取り後画面最下部までスクロール
      $('.right__contents').animate({ scrollTop: $('.right__contents')[0].scrollHeight});
    })
    .fail(function(){
      alert('error');
    })
    .always(function(){
      $(":submit").removeAttr("disabled");
    });
  })
})
