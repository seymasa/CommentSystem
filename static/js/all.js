var commentsBox = $("")
$(".ajax-form").submit(function(){
	var url  = $(this).attr('action'); // Ajax isteğin gideceği adres
	var data = $(this).serialize(); // Ajax ile gönderilecek verileri form daki elemanlardan alıyoruz (name=value) şeklinde.
	var button   = $(this).find('button'); // Gönderilen formun içindeki butonu alalım
	var textarea = $(this).find('textarea'); // Gönderilen formun içindeki textarea alalım
	var postId   = $(this).data('post-id'); // Hangi yorum listesine yorumu ekleyeceğimizi öğrenelim.

	// Ajax isteğini göndermeden önce kullanıcının istek yapıldığını bilmesi için biraz düzenleme yapalım.
	button.prop('disabled', true);
	textarea.prop('disabled', true);
	button.html("Gönderiliyor...");
	// Ajax isteğini başlatalım.
	$.ajax({
		url: url,
		method: 'POST',
		data: data,
		dataType: 'JSON'
	}).done(function(result){
		if(result.status) {
			var commentsBox = $("#comments-"+postId);

			if(commentsBox.children('.commentNone').length > 0){ // Eğer daha önceden o post'a hiç yorum yapılmamışsa...
				commentsBox.children('.commentNone').remove(); // no comments yet... yazan kutuyu kaldır.
			}
			// Yeni eklenecek HTML'imizi hazırlayalım ve değişkene atalım.
			var newComment = "<ul class='comments-list' data-id='"+result.id+"'>";
				newComment += "<li>";
					newComment += "<div class='comment-main-level'>";
						newComment += "<div class='comment-avatar'><img src='https://api.adorable.io/avatars/285/abott@adorable.png'></div>";
						newComment += "<div class='comment-box'>";
							newComment += "<div class='comment-head'>";
								newComment += "<h6 class='comment-name active-passive'>"+result.user+"</h6>";
								newComment += "<span>"+result.publishDate+"</span>";
								newComment += '<a class="delete-button" href="'+result.deleteUrl+'" data-id="'+result.id+'"><i class="fa fa-trash" aria-hidden="true"></i></a><i class="fa fa-thumbs-up" aria-hidden="true"></i>';
							newComment += "</div>";
							newComment += "<div class='comment-content'><p>"+result.comment+"</p></div>";
						newComment += "</div>";
					newComment += "</div>";
				newComment += "</li>";
			newComment += "</ul>";

			// elementimizi ekleyelim.
			commentsBox.append(newComment);
		} else {
			alert(result.error);
		}
		// Her şeyi eskisi gibi güzel olsun neolursun ^_^
		button.prop('disabled', false);
		textarea.prop('disabled', false);
		textarea.val("");
		button.html('Submit');
	});
	return false;
});

var csrf   = $("[name=csrfmiddlewaretoken]").val();
function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrf);
        }
    }
});

$(document).on('click', '.like-button', function(){
	console.log('beğenme işlemi...');
	var commentId = $(this).data('id');
	var url = $(this).attr('href');
	var button = $(this);
	$.ajax({
		method: 'POST',
		dataType: 'JSON',
		url: url,
		data: 'comment_id='+commentId
	}).done(function(result){
		var icon = button.children('i');
		var total = button.children('span');
		if(result.status){
			if(result.like){
				$(icon).removeClass('fa-thumbs-up').addClass('fa-thumbs-down');
				button.removeClass('not-liked').addClass('liked');
			} else {
				$(icon).removeClass('fa-thumbs-down').addClass('fa-thumbs-up');
				button.removeClass('liked').addClass('not-liked');
			}
			$(total).html(result.total);
		}
	});
	return false;
});

// Ajax ile sonradan oluşturduğumuz yorumlardaki silme işlemini de yakalaması için document daki silme butonlarını
// takip ettik
$(document).on('click', '.delete-button', function(){
  console.log("click");
  var button = $(this);
  var adres  = button.attr('href');
  var id     = button.data('id');
  $.ajax({
     method: 'POST',
     dataType: 'JSON',
     url: adres
	}).done(function(data){
	  if(data.status){
		  alert("Silme işlemi yapıldı");
		  $(".comments-list[data-id="+id+"]").remove();
	  } else {
		 alert(data.error);
	  }
	});
	return false;
});