$(".ajax-form").submit(function(){
    var url = $(this).attr("action");
    var data = $(this).serialize();
    $.ajax({
    method: "POST",
    url: url,
    data: data,
    dataType: "JSON"
    }).done(function(sonuc){

    });
    $(this).find("textarea").prop("disabled", true);
    $(this).find("button").html("Gönderiliyor...");
    return false;
});