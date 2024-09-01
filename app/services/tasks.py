# app/services/tasks.py

from celery import Celery
from app.core.config import settings

celery = Celery(__name__, broker=settings.REDIS_URL)

@celery.task
def verify_content_async(content:str):
    # add background verification task
    # put the logic here
    return "safe"