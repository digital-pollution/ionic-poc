import { Component, OnInit } from '@angular/core';
import { Plugins, GeolocationPosition } from '@capacitor/core';
import { ToastController } from '@ionic/angular';

const { Geolocation } = Plugins;


@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.page.html',
  styleUrls: ['./geolocation.page.scss'],
})
export class GeolocationPage implements OnInit {
  public currentPos: GeolocationPosition;
  public posWatch = [];
  private watch;
  public loadingCurrent: boolean;
  public loadingLog: boolean;
 
  constructor(
    private toastController: ToastController,
  ) { }

  ngOnInit() {}

  getCurrentPosition() {
    this.loadingCurrent = true;

    Geolocation.getCurrentPosition().then((position) => {
      this.currentPos = {
        coords: {
          accuracy: position.coords.accuracy,
          altitude: position.coords.altitude,
          altitudeAccuracy: position.coords.altitudeAccuracy,
          heading: position.coords.heading,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          speed: position.coords.speed
        },
        timestamp: position.timestamp
      };

      this.loadingCurrent = false;
     }).catch(async (error) => {
      let toast = await this.toastController.create({
        header: `Error getting location: ${error}`,
        buttons: [{
          role: 'cancel',
          side: 'end',
          icon: 'close-circle-outline'
        }]
      })

      toast.present();
      this.loadingCurrent = false;
     });
     
  }

  startWatch() {
    let toast;
    this.loadingLog = true;

    this.watch = Geolocation.watchPosition({}, async (position, err) => {

      if(!err) { 
        this.posWatch = [...this.posWatch, {
          coords: {
            accuracy: position.coords.accuracy,
            altitude: position.coords.altitude,
            altitudeAccuracy: position.coords.altitudeAccuracy,
            heading: position.coords.heading,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            speed: position.coords.speed
          },
          timestamp: position.timestamp
        }];

        toast = await this.toastController.create({
          header: `Log Updated`,
          duration: 200,
          buttons: [{
            role: 'cancel',
            side: 'end',
            icon: 'close-circle-outline'
          }]
        })
      } else {
        toast = await this.toastController.create({
          header: `Error getting location: ${err}`,
          duration: 5000,
          buttons: [{
            role: 'cancel',
            side: 'end',
            icon: 'close-circle-outline'
          }]
        })
      }

      toast.present();
    })
  }

  stopWatch() {
    Geolocation.clearWatch(this.watch);
    this.loadingLog = false;
  }

}
