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
			var newComment = "<ul class='comments-list'>";
				newComment += "<li>";
					newComment += "<div class='comment-main-level'>";
						newComment += "<div class='comment-avatar'><img src='https://api.adorable.io/avatars/285/abott@adorable.png'></div>";
						newComment += "<div class='comment-box'>";
							newComment += "<div class='comment-head'>";
								newComment += "<h6 class='comment-name active-passive'>"+result.user+"</h6>";
								newComment += "<span>"+result.publishDate+"</span>";
								newComment += '<i class="fa fa-trash" aria-hidden="true"></i><i class="fa fa-thumbs-up" aria-hidden="true"></i>';
							newComment += "</div>";

							newComment += "<div class='comment-content'><p>"+result.comment+"</p></div>";
						newComment += "</div>";
					newComment += "</div>";
				newComment += "</li>";
			newComment += "</ul>";

			// elementimizi ekleyelim.
			commentsBox.append(newComment);

			// Her şeyi eskisi gibi güzel olsun ^_^
			button.prop('disabled', false);
			textarea.prop('disabled', false);
			button.html('Yorum Yap');
		} else {
			alert(result.error);
		}
	});
	return false;
});