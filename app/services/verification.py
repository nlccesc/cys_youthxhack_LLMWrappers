# app/services/verification.py

from app.models.phishing_model import phishing_model

class ContentVerifier:
    def __init__(self):
        self.model = phishing_model

    def verify(self, content: str) -> str:
        # Use the PyTorch-based model to make a prediction
        prediction = self.model.predict(content)
        return prediction['label']
