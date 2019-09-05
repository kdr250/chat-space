$(function() {

  var search_list = $("#user-search-result");
  var add_list = $("#user-search-added");

  function appendUser(user) {

      var user_id = user.id
      var user_name = user.name
      var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user_name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name="${user_name}">追加</div>
                  </div>`
      search_list.append(html);
  }

  function appendErrMsgToHTML(msg) {
    var html = `<div>
                  ${msg}
                </div>`
    search_list.append(html);
  }

  function appendMember(user_id, user_name) {
    var html = `<div class='chat-group-user'>
         <input name='group[user_ids][]' type='hidden' value='${user_id}'>
         <p class='chat-group-user__name'>${user_name}</p>
         <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn' data-user-id=${user_id} data-user-name="${user_name}">削除</div>
       </div>`
    add_list.append(html);
  }

  $("#user-search-field").on("keyup", function(e) {
    var input = $("#user-search-field").val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json',
    })

    .done(function(users) {

      $("#user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          if( $('.chat-group-user__btn--remove[data-user-id="' + user.id + '"]').length ) {
            console.log("すでにグループメンバーにユーザーがいます")
          } else {
            appendUser(user);
          }
        })
      } else {
        appendErrMsgToHTML("一致するユーザーはありません");
      }

      $('.chat-group-user__btn--add').on('click', function(e){
        var target = $(e.target);
        var user_id = target.data('user-id')
        var user_name = target.data('user-name')
        
        appendMember(user_id, user_name);
        target.parent().remove();

      })
    })
    .fail(function() {
      console.log("fail");
      alert('ユーザー検索に失敗しました');
    })
  })
  // 削除ボタン押した時の動作
  $('.chat-group-user__btn--remove').on('click', function(e){
    var target = $(e.target);
    var user_id = target.data('user-id')
    target.parent().remove();
  })
})
