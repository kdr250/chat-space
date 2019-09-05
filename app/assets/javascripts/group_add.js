// $(function() {
//   // ユーザーをチャットメンバーに追加
//   var add_button = $(".chat-group-user__btn--add");
//   console.log(add_button);

//   function appendUser(user) {
//      var html = `<div class='chat-group-user'>
//      <input name='group[user_ids][]' type='hidden' value='ユーザーのid'>
//      <p class='chat-group-user__name'>${user.name}</p>
//      <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
//    </div>`
//       search_list.append(html);
//     }

//   // $("#user-search-field").on("", function() {
//   $('.chat-group-user__btn--add').on('click', function(){
//     // e.preventDefault();
//     var input = $("#user-search-added").val();
//     console.log(input);

//     $.ajax({
//       type: 'GET',
//       url: '/groups/new',
//       data: { keyword: input },
//       dataType: 'json',
//     })

//     .done(function(users) {
//       console.log(users)
//       console.log("done")
//       // $("#user-search-added").empty();
//       // if (users.length !== 0) {
//       //   users.forEach(function(user){
//       //     appendUser(user);
//       //     console.log(user)
//       //   });
//       // }
//     })
//     .fail(function() {
//       console.log("fail");
//       alert('ユーザー追加に失敗しました');
//       // debugger;
//     })
//   })
// })