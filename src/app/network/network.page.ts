import { Component, OnInit, OnDestroy } from '@angular/core';
import { Plugins } from '@capacitor/core';

const { Network } = Plugins;

@Component({
  selector: 'app-network',
  templateUrl: './network.page.html',
  styleUrls: ['./network.page.scss'],
})
export class NetworkPage implements OnInit, OnDestroy {
  statusHandler;
  currentStatus;

  constructor() { }

  ngOnInit() {
    this.startListeningToNetwork();
  }

  ngOnDestroy() {
    Network.removeAllListeners();
  }

  startListeningToNetwork() {
    this.statusHandler = Network.addListener('networkStatusChange', (status) => {
      console.warn('networkStatusChange', status);
      this.currentStatus = status;
    });
  }

  async getStatus() {
    this.currentStatus = await Network.getStatus();
  }

}
