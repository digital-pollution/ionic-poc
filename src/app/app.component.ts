import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Camera',
      url: '/camera',
      icon: 'warning'
    },
    {
      title: 'NFC',
      url: '/nfc',
      icon: 'warning'
    },
    {
      title: 'QR Code',
      url: '/qr-code',
      icon: 'warning'
    },
    {
      title: 'Push Notifications',
      url: '/push-notifications',
      icon: 'warning'
    },
    {
      title: 'Geolocation',
      url: '/geolocation',
      icon: 'warning'
    },
    {
      title: 'List View',
      url: '/list-view',
      icon: 'warning'
    },
    {
      title: 'Form Controls',
      url: '/form-controls',
      icon: 'warning'
    }
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }
}
