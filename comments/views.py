from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from .models import Post, Comment
from datetime import datetime
from tzlocal import get_localzone
# Create your views here.
def index(request):
    posts = Post.objects.all()
    return render(request, 'post/index.html', {'posts':posts})


def comment(request, post_id):
    post = get_object_or_404(Post, pk=post_id)
    if request.POST.get("content") == "":
        return JsonResponse({'status': False,
                             'error': "Please enter a comment ..."})

    lastComments = post.comment_set.filter(user_id=request.user.id).order_by('-publishDate')
    if len(lastComments) > 0:
        local_tz = get_localzone()
        now = datetime.now(local_tz)
        lastComment = lastComments[0]
        lastDate = lastComment.publishDate
        time_control = now - lastDate
        if time_control.seconds <= 15:
            return JsonResponse({'status': False,
                                 'error': "Try commenting again in 15 seconds!"})

    content = request.POST.get("content")
    comment = Comment(content=content, user=request.user, post=post, publishDate=datetime.now())
    comment.save()
    return JsonResponse({'status': True,
                         'comment': content,
                         'publishDate': comment.publishDate.strftime("%d.%m.%Y %H:%M"),
                         'user': comment.user.username})

'''
Bana Gelen Veriler:
- post_id
- user

Yapılacak İşlemler
1) post_id'yi kullanarak post modeline eriş
2) o post modeline ait yorumlardan user_id'si bana gelen user olanın yorumlarını tarihe göre büyükten küçüğe sırala ve ilkini çek
3) çekebildim mi?
 3.a) çekebildiysem o yorumun tarihi ile benim şuanki tarih saatimi karşılaştır ve uygun mu bak?
   3.a.1) uygun değilse hata döndür
   3.a.2) uygunsa devam et
  3.b) çekemediysem bir şeyi kontrol etmeye gerek yok yorumu kaydetmeye devam et
4) yeni yorumu kaydet
'''