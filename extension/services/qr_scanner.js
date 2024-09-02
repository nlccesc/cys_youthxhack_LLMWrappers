// extension/services/qr_scanner.js

// TODO implement QR scanner class here

<<<<<<< Updated upstream
import { QRDecoder } from 'qrdecoder.js';
=======
import jsQR from 'jsqr';
>>>>>>> Stashed changes

class QRScanner {
    scan(imageData) {
        console.log('Scanning QR code...');
        const code = jsQR(imageData.data, imageData.width, imageData.height);
        if (code) {
            return code.data;
        } else {
            console.error('No QR code found.');
            return null;
        }
    }
}

export { QRScanner };
