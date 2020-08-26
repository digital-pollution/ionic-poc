import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';

const { Geolocation } = Plugins;


@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.page.html',
  styleUrls: ['./geolocation.page.scss'],
})
export class GeolocationPage implements OnInit {
  public currentPos;
  public posWatch = [];
  private watch;
 

  constructor() { }

  ngOnInit() {}

  getCurrentPosition() {

    Geolocation.getCurrentPosition().then((coordinates) => {
      this.currentPos = coordinates;
      console.log('Current', coordinates);
     }).catch((error) => {
       console.log('Error getting location', error);
     });
     
  }

  startWatch() {
    this.watch = Geolocation.watchPosition({}, (position, err) => {
      this.posWatch.push(position);
    })
  }

  stopWatch() {
    Geolocation.clearWatch(this.watch);
  }

}
