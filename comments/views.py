from django.shortcuts import HttpResponse,render, HttpResponseRedirect, get_object_or_404
import json
from django.urls import reverse
from .models import Post, Comment
from datetime import datetime
# Create your views here.
def index(request):
    posts = Post.objects.all()
    return render(request, 'post/index.html', {'posts':posts})

def comment(request,post_id):

    now= datetime.now()
    user = request.user
    post = get_object_or_404(Post, pk=post_id)
    #hide_user = request(default={'hide_user': False})
    comment = Comment(content=request.POST.get("content"), user=user, post=post,publishDate=now)
    comment.save()
    cevap = {}
    cevap['status'] = True
    cevap['comment'] = request.POST.get('content')
    cevap['publishDate'] = comment.publishDate.strftime("%d.%m.%Y");
    cevap['user'] = comment.user.username
    return HttpResponse(json.dumps(cevap), content_type="application/json")