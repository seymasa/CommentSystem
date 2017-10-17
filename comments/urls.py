from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index, name='comment.index'), # comments sonrası boş gelirse
    url(r'^(?P<post_id>[0-9]+)/$', views.comment, name='comment.send'),
]
