# app/models/phishing_model.py

import torch
from transformers import AutoModelForSequenceClassification, AutoTokenizer
from art.estimators.classification import PyTorchClassifier
from art.defences.preprocessor import JpegCompression
from torch.optim import Adam

class PhishingDetectionModel:
    def __init__(self, model_name: str):
        self.tokenizer = AutoTokenizer.from_pretrained(model_name)
        self.model = AutoModelForSequenceClassification.from_pretrained(model_name)

        # wrap model using art's 'pytorchclassifier'
        self.art_classifier = self._wrap_with_art()

    def _wrap_with_art(self):
        # art classifier wrapping pytorch model
        optimizer = Adam(self.model.parameters(), lr=0.01)

        art_classifier = PyTorchClassifier(
            model=self.model,
            clip_values=(0.0, 1.0),
            loss=torch.nn.CrossEntropyLoss(),
            optimizer=optimizer,
            input_shape=(1, 768),
            nb_classes=2,
        )

        # JPEG compression
        compression = JpegCompression(clip_values=(0.0, 1.0))
        art_classifier = art_classifier.set_params(preprocessing_defences = compression)

        return art_classifier
    

    def predict(self, text: str):
        inputs = self.tokenizer(text, return_tensors="pt")

        inputs_numpy = inputs['input_ids'].numpy()

        predictions = self.art_classifier.predict(inputs_numpy)
        predicted_class = predictions.argmax(axis=1)[0]

        if predicted_class == 1:
            return {"label": "phishing", "score": predictions[0][predicted_class]}
        else:
            return {"label": "safe", "score": predictions[0][predicted_class]}
        
phishing_model = PhishingDetectionModel("distilbert-base-uncased")
        
