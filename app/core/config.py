# app/core/config.py

import pydantic_settings 

class Settings(pydantic_settings.BaseSettings):
    PROJECT_NAME: str = "youthxhack"
    DATABASE_URL: str
    REDIS_URL : str
    SECRET_KEY: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    class Config:
        env_file=".env"

settings = Settings()