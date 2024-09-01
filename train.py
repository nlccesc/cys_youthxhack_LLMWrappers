# app/models/train.py

import torch
from torch.utils.data import DataLoader
from torch.optim import Adam
from torch.nn import CrossEntropyLoss
from torch.cuda import is_available
from transformers import AutoTokenizer

from app.models.phishing_model import PhishingDetectionModel
from app.utils.dataset import QRCodeDataset
from app.utils.helpers import log_to_console

def train_model():
    root_dir = "your_root_dir"
    
    try:
        # Initialize dataset and DataLoader
        dataset = QRCodeDataset(root_dir=root_dir)
        train_loader = DataLoader(dataset, batch_size=32, shuffle=True)
        log_to_console(f"Loaded dataset with {len(dataset)} samples.")
    except ValueError as e:
        log_to_console(f"Error initializing dataset: {e}")
        return

    # Initialize model and tokenizer
    phishing_model = PhishingDetectionModel("distilbert-base-uncased")
    tokenizer = AutoTokenizer.from_pretrained("distilbert-base-uncased")

    device = torch.device("cuda" if is_available() else "cpu")
    phishing_model.model.to(device)

    # Optimizer and loss function
    optimizer = Adam(phishing_model.model.parameters(), lr=0.001)
    criterion = CrossEntropyLoss()

    log_to_console("Initializing training...")

    num_epochs = 10
    for epoch in range(num_epochs):
        phishing_model.model.train()
        total_loss = 0.0
        correct = 0
        total = 0

        log_to_console(f"Starting epoch {epoch+1}")

        for batch_idx, (texts, labels) in enumerate(train_loader):
            log_to_console(f"Processing batch {batch_idx+1} with {len(texts)} samples.")

            optimizer.zero_grad()

            inputs = tokenizer(list(texts), padding=True, truncation=True, return_tensors="pt").to(device)

            labels = labels.to(device)

            try:
                # Forward pass
                outputs = phishing_model.model(**inputs).logits
                log_to_console(f"Output logits shape: {outputs.shape}")

                loss = criterion(outputs, labels.long())
                log_to_console(f"Batch {batch_idx+1} loss: {loss.item()}")

                # Backward pass and optimization
                loss.backward()
                optimizer.step()

                total_loss += loss.item()
                _, predicted = torch.max(outputs, 1)
                correct += (predicted == labels).sum().item()
                total += labels.size(0)

            except Exception as e:
                log_to_console(f"Error during training: {e}")
                return

        avg_loss = total_loss / len(train_loader)
        accuracy = correct / total * 100
        log_to_console(f"Epoch {epoch+1}/{num_epochs}, Loss: {avg_loss:.4f}, Accuracy: {accuracy:.2f}%")
    
    log_to_console("Training complete.")
    
    torch.save(phishing_model.model.state_dict(), "trained_phishing_model.pth")
    log_to_console("Model saved as trained_phishing_model.pth")

if __name__ == "__main__":
    train_model()
