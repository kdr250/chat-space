
$(function(){
  function buildHTML(message, text, image){
    var html = `<div class="right__contents__messagebox">
    <div class="right__contents__messagebox__message--name">
    ${message.user_name}
    </div>
    <div class="right__contents__messagebox__message--date">
    ${message.created_at}
    </div>
    <div class="right__contents__messagebox--text">
        ${text}
        </div>`;

  if (image != null) {
    html += `
          <div>
          <img alt="test" style="margin-top: 10px;" src=${image} width="200" height="132">
          </div>`;
    };
    return html;
  }

  $('#new_message').on('submit', function(e){
    // preventDefault()を使用してデフォルトのイベントを止めます。
    e.preventDefault();
    var formData = new FormData(this);
    var url = $('#new_message').attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var text = data.text ? data.text : '';
      var image = data.image.url ? data.image.url : null;
      var html = buildHTML(data, text, image);

      $('.right__contents').append(html);
      $('#new_message').get(0).reset();
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
