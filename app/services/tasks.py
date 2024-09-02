# app/services/tasks.py

from celery import Celery
# Add the following line to resolve the import error
import sys
sys.path.append('/path/to/celery')
from app.core.config import settings

celery = Celery(__name__, broker=settings.REDIS_URL)

@celery.task
def verify_content_async(content:str):
    # add background verification task
    # put the logic here
    return "safe"