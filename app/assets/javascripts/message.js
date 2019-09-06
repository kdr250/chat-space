
$(function(){

  function buildHTML(message){
    var text = message.text ? message.text : '';
    var image = message.image.url ? `<img alt="test" src="${message.image.url}" width="200" height="132" style="margin-top: 10px;" >` : '';
    
    var html = `<div class="right__contents__messagebox" data-id='${message.id}'>
      <div class="right__contents__messagebox__message--name">
        ${message.user_name}
    </div>
    <div class="right__contents__messagebox__message--date">
      ${message.created_at}
    </div>
    <div class="right__contents__messagebox--text">
      ${text}
    </div>
    <div>
      ${image}
    </div>`;
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
      contentType: false,
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.right__contents').append(html);
      $('#new_message').get(0).reset();
      //データ受け取り後画面最下部までスクロール
      $('.right__contents').animate({ scrollTop: $('.right__contents')[0].scrollHeight});
      console.log("submit-animate")
      console.log($('.right__contents').animate({ scrollTop: $('.right__contents')[0].scrollHeight}));
    })
    .fail(function(){
      alert('error');
    })
    .always(function(){
      $(":submit").removeAttr("disabled");
    });
  })

  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    last_message_id = $('.right__contents__messagebox:last').data('id')
    console.log(last_message_id)
    $.ajax({
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      url: 'api/messages',
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
      // debugger;
      console.log(messages)
      //追加するHTMLの入れ物を作る
      var insertHTML = '';

      //メッセージが入ったHTMLを取得
      var messege_box = $('.right__contents')

      //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
      messages.forEach(function(message){
        console.log(message)
        var text = message.text ? message.text : '';
        var image = message.image.url ? `<img alt="test" src="${message.image.url}" width="200" height="132" style="margin-top: 10px;" >` : '';
        
        var html = `<div class="right__contents__messagebox" data-id='${message.id}'>
                    <div class="right__contents__messagebox__message--name">
                      ${message.user_name}
                    </div>
                    <div class="right__contents__messagebox__message--date">
                      ${message.created_at}
                    </div>
                    <div class="right__contents__messagebox--text">
                      ${text}
                    </div>
                    <div>
                      ${image}
                    </div>`;
        //メッセージを追加
        $(messege_box).append(html);
      })

      $(messege_box).animate({ scrollTop: $(messege_box)[0].scrollHeight});

      console.log('success');
    })
    .fail(function() {
      console.log('error');
    });
  };

  //$(function(){});の閉じタグの直上(処理の最後)に以下のように追記
  setInterval(reloadMessages, 5000);

})
