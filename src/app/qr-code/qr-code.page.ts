import { Component, OnInit } from '@angular/core';

declare let window: any;

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.page.html',
  styleUrls: ['./qr-code.page.scss'],
})
export class QrCodePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  scanCode() {
    try {
      window.cordova.plugins.barcodeScanner.scan(
        result => console.log(result),
        err => console.error(err),
        {
          showTorchButton: true,
          prompt: "Scan your code",
          formats: "QR_CODE",
          resultDisplayDuration: 0
        }
      );
    } catch(e) {
      console.error('an error occurred', e);
    }
  }
}
