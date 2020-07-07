$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="MessageBox">
          <div class="MessageBox__info">
            <div class="MessageBox__info__username">
              ${message.user_name}
            </div>
            <div class="MessageBox__info__date">
              ${message.created_at}
            </div>
          </div>
          <div class="MessageBox__message">
            <p class="MessageBox__message__content">
              ${message.content}
            </p>
            <img class="Message__image" src="${message.image}">
          </div>
        </div>`
      return html;
    } else {
      let html =
      `<div class="MessageBox">
        <div class="MessageBox__info">
          <div class="MessageBox__info__username">
            ${message.user_name}
          </div>
          <div class="MessageBox__info__date">
            ${message.created_at}
          </div>
        </div>
        <div class="MessageBox__message">
          <p class="MessageBox__message__contentt">
            ${message.content}
          </p>
        </div>
      </div>`
      return html;
    };
  }

  $('.new_message').on('submit', function(e){
    e.preventDefault()
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.MessageList').append(html);
      $('.MessageList').animate({ scrollTop: $('.MessageList')[0].scrollHeight});
      $('.new_message')[0].reset();
      $('.submit-btn').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
  });
  })
})