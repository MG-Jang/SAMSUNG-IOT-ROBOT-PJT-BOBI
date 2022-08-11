"""bobi_backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.conf.urls import url, include
from rest_framework import routers
from accounts.views import UserViewSet
from archives.views import ArchiveImageViewSet, ArchiveVideoViewSet
from stories.views import StoryViewSet
from movements.views import MovementViewSet
from bobi.views import SensorViewSet
from django.views.generic import TemplateView

router = routers.DefaultRouter()
router.register('stories', StoryViewSet)
router.register('movements', MovementViewSet)
router.register('sensors', SensorViewSet)
router.register('users', UserViewSet)
router.register('archiveimages', ArchiveImageViewSet)
router.register('archivevideos', ArchiveVideoViewSet)

urlpatterns = [
    path('', TemplateView.as_view(template_name='index.html')),
    path('admin/', admin.site.urls),
    path('api/v1/', include(router.urls)),
    # path('api/v1/stories/', StoryListAPI.as_view()),
    # path('api/v1/bobi/', include('bobi.urls')),
    # path('api/v1/accounts/', include('accounts.urls')),
    # path('api/v1/stories/', include('stories.urls')),
    # path('api/v1/movements/', include('movenments.urls')),
    # path('api/v1/stories/', include('stories.urls')),
    # path('api/v1/voices/', include('voices.urls')), 
]
