$(function() {

  var search_list = $("#user-search-result");
  var add_list = $("#user-search-added");
  // var member_list = []

  // インクリメンタルサーチ
  // console.log(search_list);


  function appendUser(user) {
    
    // $('.chat-group-user__btn--remove').each(function(i, each){
      // if ($(each).data('user_id').is(user.id)) {
    
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
    // e.preventDefault();
    var input = $("#user-search-field").val();
    console.log("input");
    console.log(input);

    $.ajax({
      type: 'GET',
      url: '/groups/new',
      data: { keyword: input },
      dataType: 'json',
    })

    .done(function(users) {
      console.log("users")
      console.log(users)
      // console.log("done")
      // var 
      $("#user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          // console.log($('.chat-group-user__btn--remove[date-user-id="' + user.id + '"]'))
          console.log($('.chat-group-user__btn--remove[data-user-id="' + user.id + '"]'))
          if( $('.chat-group-user__btn--remove[data-user-id="' + user.id + '"]').length ) {
          // if($('.chat-group-user__btn--remove').is('[date-user-id="' + user.id + '"]')){
            // $('input[value="' + user.id + '"]');
            console.log("すでにグループメンバーにユーザーがいます")
          } else {
            console.log("グループメンバーにユーザーがいないので表示します")
            appendUser(user);
          }
        })
      } else {
        appendErrMsgToHTML("一致するユーザーはありません");
        // console.log("一致するユーザーはありません")
      }

      $('.chat-group-user__btn--add').on('click', function(e){
        // e.preventDefault();
        var target = $(e.target);
        // console.log("target")
        // console.log(target.data('user-id'))
        var user_id = target.data('user-id')
        var user_name = target.data('user-name')

        // console.log("user_id");
        // console.log(user_id);
    
        // $.ajax({
        //   type: 'GET',
        //   url: '/users',
        //   data: { keyword: user_id },
        //   dataType: 'json',
        // })
    
        // .done(function(user) {
          // console.log("user")
          // console.log(user) // => {id: 1, name: "Taro"} id: 1, name: "Taro"

        appendMember(user_id, user_name);
        target.parent().remove();
        

        // 削除ボタン押した時の動作
        $('.chat-group-user__btn--remove').on('click', function(e){
            // e.preventDefault();
            var target = $(e.target);
            var user_id = target.data('user-id')
            // var remove_user = $('.chat-group-user__btn--remove [data-user-id=$user.id}]');
            console.log("user_id");
            console.log(user_id);
            target.parent().remove();
            // })
        })
      })
    })
    .fail(function() {
      console.log("fail");
      alert('ユーザー検索に失敗しました');
      // debugger;
    })
  })
})


// $.ajax({
            //   type: 'GET',
            //   // url: '/groups/new',
            //   url: '/users',
            //   data: { keyword: user_id },
            //   // data: set_user,
            //   dataType: 'json',
            // })
        
            // .done(function(user) {
            //   console.log("hoge")
            //   $('').remove();
            // })

            // .fail(function() {
            //   console.log("fail");
            //   alert('ユーザー追加に失敗しました');

            // })
          // })

          // submitボタンを押した時
          // $('.chat-group-form__action-btn').on('click', function(e){
          //   e.preventDefault();
          //   var group_info = {}
          //   var user_ids = []
          //   // each = $('.chat-group-user__btn--remove').data('user-id')
          //   // console.log(each)
          //   // console.log($('.chat-group-user__btn--remove'))
          //   $('.chat-group-user__btn--remove').each(function(i, each){
          //     console.log("each")
          //     // console.log(each)
          //     var user_id = $(each).data('user-id')
          //     console.log(user_id)
          //      user_ids.push(user_id)
          //     // var user = { name:'太郎', age:32, tel:'080-1234-5678' };
          //   })

          //   var title = $('#chat_group_name').val()
          //   group_info['title'] = title
          //   group_info['user_ids'] = user_ids
          //   console.log(title)
          //   console.log(group_info)
            
          //   $.ajax({
          //     type: 'POST',
          //     url: '/groups',
          //     data: { keyword: group_info },
          //     dataType: 'json',
          //   })

          //   .done(function() {
          //     console.log("done-submit");
          //   })
          //   .fail(function() {
          //     console.log("fail-submit");
          //     alert('グループ作成に失敗しました');
          //   })
        
        // .fail(function() {
        //   console.log("fail");
        //   alert('ユーザー追加に失敗しました');
        //   // debugger;
        // })





// $(function() {

//   var search_list = $(".listview.js-lazy-load-images");
  
//   function appendProduct(product) {
//      var html = `<li>
//                     <a class="listview__element--right-icon" href="/products/${ product.id }/reviews/new" title="${ product.title }">
//                       <div class="position-right p1em">
//                         <i class="icon-chevron-right color-sub"></i>
//                       </div>
//                       <div class="row no-space-bottom">
//                         <div class="col2">
//                           <div class="thumbnail thumbnail--movies">
//                             <div class="thumbnail__figure" style="background-image: url(${ product.image });" title="${ product.title }"></div>
//                           </div>
//                         </div>
//                         <div class="col6 push6">
//                           <h3 class="text-middle text-break">
//                             <span class="color-sub">${ product.title }</span>
//                           </h3>
//                           <p class="text-xsmall text-overflow">
//                             ${ product.detail }
//                           </p>
//                         </div>
//                       </div>
//                     </a>
//                   </li>`
//       search_list.append(html);
//    }
  
//    function appendErrMsgToHTML(msg) {
//       var html = `<li>
//                     <div class='listview__element--right-icon'>${ msg }</div>
//                   </li>`
//       search_list.append(html);
//     }
  
//     $(".search__query").on("keyup", function() {
//       var input = $(".search__query").val();
//       console.log(input);
  
//       $.ajax({
//         type: 'GET',
//         url: '/products/search',
//         data: { keyword: input },
//         dataType: 'json'
//       })
  
//       .done(function(products) {
//         $(".listview.js-lazy-load-images").empty();
//         if (products.length !== 0) {
//           products.forEach(function(product){
//             appendProduct(product);
//           });
//         }
//         else {
//           appendErrMsgToHTML("一致する映画はありません");
//         }
//       })
//       .fail(function() {
//         alert('映画検索に失敗しました');
//       })
//     });
//   });