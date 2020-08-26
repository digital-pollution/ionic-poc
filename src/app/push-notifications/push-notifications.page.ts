import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';

const { LocalNotifications, Toast } = Plugins;

@Component({
  selector: 'app-push-notifications',
  templateUrl: './push-notifications.page.html',
  styleUrls: ['./push-notifications.page.scss'],
})
export class PushNotificationsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  async sendNotification() {
    console.warn('sendNotification');

    const notifs = await LocalNotifications.schedule({
      notifications: [
        {
          title: "Hello From Demo App",
          body: "Body",
          id: 1,
          schedule: { at: new Date(Date.now() + 1000 * 5) },
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
