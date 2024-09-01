# app/api/endpoints.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.db import get_db
from app.models.models import ContentVerificationLog
from app.services.verification import ContentVerifier

router = APIRouter()

@router.post("/verify")
async def verify_content(content:str, db: Session = Depends(get_db)):
    verifier = ContentVerifier()
    result = verifier.verify(content)

    log_entry = ContentVerificationLog(content=content,
                                       result=result)
    db.add(log_entry)
    db.commmit()

    return {"content": content, "result": result}