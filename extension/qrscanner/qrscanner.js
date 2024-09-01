import { QRDecoder } from 'qrdecoder.js';

class QRScanner {
    constructor() {
        this.decoder = new QRDecoder();
    }

    scan(imageData) {
        console.log('Scanning QR code...');
        const decodedData = this.decoder.decode(imageData);
        return decodedData;
    }
}

export { QRScanner };
