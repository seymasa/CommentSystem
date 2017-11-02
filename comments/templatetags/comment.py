from django import template

register = template.Library()

@register.filter(name='userliked') # Eğer template'de fonksiyon kullanmam lazımsa  {{ icerik|fonksiyonunadi:parametre
def userliked(comment,request): # icerik=comment, fonksiyonunadi:userLiked, parametre:request bu örnekte
    return comment.userLiked(request) # Comment modelindeki userLiked fonksiyonunu çalıştır ve sonucu döndür