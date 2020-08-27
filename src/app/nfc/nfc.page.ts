import { Component, OnInit } from '@angular/core';
import { NFC, Ndef } from '@ionic-native/nfc/ngx';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-nfc',
  templateUrl: './nfc.page.html',
  styleUrls: ['./nfc.page.scss'],
  providers: [NFC, Ndef]
})
export class NfcPage implements OnInit {
  nfcData;
  readerMode$;
  message;

  constructor(
    private nfc: NFC, 
    private ndef: Ndef,
    private toastController: ToastController,
  ) { }


  ngOnInit() {
  }

  onNfcWrite() {
    this.message = [
        this.ndef.textRecord(this.message)
    ];
    
    this.nfc.write(this.message).then((res) => {

    }).catch(async (error) => {
      let toast = await this.toastController.create({
        header: `Error getting location: ${error}`
      })

      toast.present();
     });

  }

  onNfcRead() { 
    let flags = this.nfc.FLAG_READER_NFC_A | this.nfc.FLAG_READER_NFC_V;
    
    this.readerMode$ = this.nfc.readerMode(flags).subscribe(
        tag => this.nfcData = tag,
        err => this.nfcData = err
    );

    setTimeout(() => {
      this.readerMode$.unsubscribe();
    },30000);
  }
}
