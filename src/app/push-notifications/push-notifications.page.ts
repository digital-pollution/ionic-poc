import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';

const { LocalNotifications, Toast } = Plugins;

@Component({
  selector: 'app-push-notifications',
  templateUrl: './push-notifications.page.html',
  styleUrls: ['./push-notifications.page.scss'],
})
export class PushNotificationsPage implements OnInit {
  ntitle: string = 'You have been assigned';
  nbody: string = 'Open application to review';
  ndelay: number = 10000;

  constructor() {

  }

  ngOnInit() {
  }

  async sendNotification() {
    console.warn('sendNotification');

    const notifs = await LocalNotifications.schedule({
      notifications: [
        {
          title: this.ntitle,
          body: this.nbody,
          id: 1,
          schedule: { at: new Date(Date.now() + this.ndelay * 5) },
          sound: null,
          attachments: null,
          actionTypeId: "",
          extra: null
        }
      ]
    });

    await Toast.show({
      text: 'notification sent!'
    });

    console.log('scheduled notifications', notifs);
  }


}
