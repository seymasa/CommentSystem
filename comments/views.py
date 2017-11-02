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
    hide_user_status = False
    if request.POST.get('hide_user'):
        hide_user_status =True
    comment = Comment(content=content, user=request.user, post=post, publishDate=datetime.now(), hide_user= hide_user_status)
    comment.save()
    return JsonResponse({'status': True,
                         'comment': content,
                         'publishDate': comment.publishDate.strftime("%b. %d, %Y, %H:%M %p"),
                         'user':  "Guest" if comment.hide_user  else comment.user.username })

def comment_delete(request, post_id):
    comm = get_object_or_404(Comment, pk=post_id)
    comm.delete()
    return JsonResponse({'status':False})
