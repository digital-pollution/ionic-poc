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
  isReaderOpen = false;

  constructor(
    private nfc: NFC, 
    private ndef: Ndef,
    private toastController: ToastController
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
        header: `Error Writing Data: ${error}`,
        buttons: [{
          role: 'cancel',
          side: 'end',
          icon: 'close-circle-outline'
        }]
      })

      toast.present();
     });

  }

  onNfcRead() { 
    let flags = this.nfc.FLAG_READER_NFC_A | this.nfc.FLAG_READER_NFC_V;
    let toast; 
    
    this.isReaderOpen = true;

    this.readerMode$ = this.nfc.readerMode(flags).subscribe(
        async (tag) => {
          this.nfcData = tag;

          toast = await this.toastController.create({
            header: `Succesfully Retrieved Data`,
            buttons: [{
              role: 'cancel',
              side: 'end',
              icon: 'close-circle-outline'
            }]
          })

          toast.present();
        },
        async (err) => {
          this.nfcData = err

          toast = await this.toastController.create({
            header: `Error Retrieving Data: ${err}`,
            buttons: [{
              role: 'cancel',
              side: 'end',
              icon: 'close-circle-outline'
            }]
          })

          toast.present();
        }
    );


    setTimeout(() => {
      this.isReaderOpen = false;
      this.readerMode$.unsubscribe();
    }, 5000);
  }
}
