var url = $(this).attr("action");
var data = $(this).serialize();
$.ajax({
method: "POST",
url: url,
data: data,
dataType: "JSON"
}).done(function(sonuc){
alert(sonuc);
});