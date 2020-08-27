import { Component, OnInit } from '@angular/core';
import { NFC, Ndef } from '@ionic-native/nfc/ngx';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-nfc',
  templateUrl: './nfc.page.html',
  styleUrls: ['./nfc.page.scss'],
})
export class NfcPage implements OnInit {
  nfcData;
  readerMode$;

  constructor(
    private nfc: NFC, 
    private ndef: Ndef,
    private toastController: ToastController,
  ) { }


  ngOnInit() {
  }

  onNfcWrite(nfcEvent) {
    console.warn(nfcEvent);
    
    var message = [
        this.ndef.textRecord('new nfc data!')
    ];
    
    this.nfc.write(message);
  }

  onNfcRead() { 
    let flags = this.nfc.FLAG_READER_NFC_A | this.nfc.FLAG_READER_NFC_V;
    this.readerMode$ = this.nfc.readerMode(flags).subscribe(
        tag => console.log(JSON.stringify(tag)),
        err => console.log('Error reading tag', err)
    );
  }
}
