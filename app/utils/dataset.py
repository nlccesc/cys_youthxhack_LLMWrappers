# app/utils/dataset.py

import os
from PIL import Image
from torch.utils.data import Dataset
from torchvision import transforms
import cv2

class QRCodeDataset(Dataset):
    def __init__(self, root_dir, transform=None):
        self.root_dir = root_dir
        self.transform = transform
        self.data = []
        self.labels = []

        benign_dir = os.path.join(root_dir, "benign", "benign")
        malicious_dir = os.path.join(root_dir, "malicious", "malicious")

        if not os.path.exists(benign_dir):
            raise FileNotFoundError(f"Directory not found: {benign_dir}")
        if not os.path.exists(malicious_dir):
            raise FileNotFoundError(f"Directory not found: {malicious_dir}")

        print(f"Looking for files in {benign_dir}")
        print(f"Looking for files in {malicious_dir}")

        # Load benign QR
        for filename in os.listdir(benign_dir):
            if filename.endswith(".png"):
                text = self.extract_text_from_qr(os.path.join(benign_dir, filename))
                self.data.append(text)
                self.labels.append(0)

        # Load malicious QR
        for filename in os.listdir(malicious_dir):
            if filename.endswith(".png"):
                text = self.extract_text_from_qr(os.path.join(malicious_dir, filename))
                self.data.append(text)
                self.labels.append(1)

        print(f"Loaded {len(self.data)} samples from {root_dir}")
        if len(self.data) == 0:
            raise ValueError("No samples found in the specified directories.")

    def extract_text_from_qr(self, image_path):
        image = cv2.imread(image_path)
        detector = cv2.QRCodeDetector()
        data, _, _ = detector.detectAndDecode(image)
        return data

    def __len__(self):
        return len(self.data)

    def __getitem__(self, idx):
        text = self.data[idx]
        label = self.labels[idx]
        return text, label

root_dir = "your_root_dir"

qr_code_dataset = QRCodeDataset(root_dir=root_dir)
