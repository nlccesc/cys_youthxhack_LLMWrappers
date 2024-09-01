# app/api/endpoints.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.db import get_db
from app.models.models import ContentVerificationLog
from app.services.verification import ContentVerifier
from datetime import datetime

router = APIRouter()

@router.post("/verify")
async def verify_content(content: str, db: Session = Depends(get_db)):
    verifier = ContentVerifier()
    result = verifier.verify(content)

    try:
        log_entry = ContentVerificationLog(
            content=content,
            result=result,
            timestamp=datetime.utcnow()
        )
        db.add(log_entry)
        db.commit()
        db.refresh(log_entry)

        return {"content": content, "result": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
