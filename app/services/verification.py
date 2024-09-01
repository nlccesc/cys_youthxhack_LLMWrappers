# app/services/verification.py

class ContentVerifier:
    def verify(self, content:str) -> str:
        # testing purpose
        if "malicious" in content.lower():
            return "suspicious"
        return "safe"