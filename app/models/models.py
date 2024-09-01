# app/models/models.py

from sqlalchemy import Column, Integer, String, DateTime
from app.core.db import Base

class ContentVerificationLog(Base):
    __tablename__ = "verification_logs"

    id = Column(Integer, primary_key=True, index=True)
    content = Column(String, index=True)
    result = Column(String)
    timestamp = Column(DateTime)
