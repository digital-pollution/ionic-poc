import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery/ngx';
import { ToastController } from '@ionic/angular';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

declare let window: any;

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.page.html',
  styleUrls: ['./qr-code.page.scss'],
  providers: [AndroidPermissions]
})
export class QrCodePage implements OnInit {
  qrData = 'Hello World';
  scannedCode = null;
  elementType: 'url' | 'canvas' | 'img' = 'canvas';

  constructor(
    private barCodeScanner: BarcodeScanner,
    private base64ToGallery: Base64ToGallery,
    private toastController: ToastController,
    private androidPermissions: AndroidPermissions
  ) { }

  ngOnInit() {
    this.androidPermissions.requestPermissions([
      this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE, 
      this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE
    ]);
  }

  scanCode() {
    this.barCodeScanner.scan().then(
      barcodeData => {
        this.scannedCode = barcodeData;
      }

    )    
  }

  downloadQR() {
    const canvas = document.querySelector('canvas') as HTMLCanvasElement;
    const imageData = canvas.toDataURL('image/jpeg').toString();
    let data = imageData.split(',')[1];

    this.base64ToGallery.base64ToGallery(
      data, 
      { prefix: 'img', mediaScanner: true }
    ).then(async res => {
      let toast = await this.toastController.create({
        header: 'QR Code saved to Gallery',
        buttons: [{
          role: 'cancel',
          side: 'end',
          icon: 'close-circle-outline'
        }]
      });

      toast.present();
    }, err => console.error(err)
    );
  }
}
