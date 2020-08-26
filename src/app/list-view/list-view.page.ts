import { Component, OnInit, Input } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.page.html',
  styleUrls: ['./list-view.page.scss'],
})
export class ListViewPage implements OnInit {

  shifts = [{
    id: '1',
    location: 'cucumber Office',
    tasks: [
      {
        name: 'empty bins',
        description: 'empty the break room bins' 
      },
      {
        name: 'take out bins',
        description: 'sort the recycling and take out for collection' 
      }
    ]
  },
  {
    id: '2',
    location: 'Countdown Bayfair',
    tasks: [
      {
        name: 'Mop floors',
        description: 'Mop and Polish' 
      }
    ]
  },
  {
    id: '3',
    location: 'Library',
    tasks: [
      {
        name: 'Clean windows',
        description: 'Clean the windows, requires scaffolding' 
      }
    ]
  },
  {
    id: '4',
    location: 'Cinema',
    tasks: [
      {
        name: 'Clean Bathrooms',
        description: 'deep clean overnight shift' 
      }
    ]
  },
  {
    id: '5',
    location: 'Our Place',
    tasks: [
      {
        name: 'Eat Dumplings',
        description: 'mmm dumplings' 
      }
    ]
  }
];


  constructor(
    public actionSheetController: ActionSheetController,
    public modalController: ModalController
  ) { }

  ngOnInit() {
  }

  async showActions(uuid: String) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Team Actions',
      cssClass: 'my-custom-class',
      buttons: [
        {
          text: 'Start',
          icon: 'play-circle',
          handler: () => {
            console.log('Start clicked');
          }
        },
        {
          text: 'Accept',
          icon: 'checkmark-circle',
          handler: () => {
            console.log('Accept clicked');
          }
        },    
        {
          text: 'Delete',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            console.log('Delete clicked');
          }
        },         
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {}
        }]
    });
    await actionSheet.present();
  }

  async presentModal(taskArray) {
    const modal = await this.modalController.create({
      component: ModalPage,
      cssClass: 'tasks',
      componentProps: taskArray
    });
    return await modal.present();
  }
}


@Component({
  selector: 'modal-page',
  template: `
    <ion-list>
      <ion-item lines="none" lines="full" *ngFor="let task of taskArray">
        <strong>{{ task.name }}</strong><br> 
        <small>{{ task.description }}</small>
      </ion-item>    
    </ion-list>
  `
})
export class ModalPage {
  @Input() taskArray;

  constructor() {}
}