function Comment()
{
  $.ajax({
            url: '/comments',
            data: "jijiMesaj="+$('#txtComments').val(),
            type: 'POST',
            success: function(response) {
                   $('#commentList').prepend(response);
            },
            error: function(error) {
                console.log(error);
                allert("error")
            }
        });
}

