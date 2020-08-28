import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
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
    accepted: false,
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
    accepted: false,
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
    accepted: false,
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
    accepted: false,
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
    accepted: false,
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

  async showActions(shift: any) {
    const actionSheet = await this.actionSheetController.create({
      header: shift.location,
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.shifts = this.shifts.filter((i) => { 
              return i.id != shift.id; 
            });
          }
        },  
        {
          text: 'Info',
          handler: () => {
            this.presentModal(shift);
          }
        },    
        {
          text: 'Accept',
          handler: () => {
            shift.accepted = true;
            const foundIndex = this.shifts.findIndex(i => i.id == shift.id);
            this.shifts[foundIndex] = shift;
          }
        },    
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {}
        }]
    });
    await actionSheet.present();
  }

  async presentModal(job) {
    const modal = await this.modalController.create({
      component: ModalPage,
      cssClass: 'tasks',
      componentProps: {
        'job': job
      }
    });
    return await modal.present();
  }
}


@Component({
  selector: 'modal-page',
  template: `
    <ion-header translucent>
    <ion-toolbar>
      <ion-title>{{job.location}}</ion-title>
      <ion-buttons slot="end">
        <ion-button (click)="dismissModal()">Close</ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content fullscreen>

    <ion-item lines="none">
      <ion-title>Tasks: </ion-title>
    </ion-item>

    <ion-list *ngIf="job">

      <ion-item lines="full" *ngFor="let task of job.tasks">
        <ion-text>
          <br />
          <ion-title>{{ task.name }}</ion-title>
          <p>{{ task.description }}</p>
        </ion-text>
      </ion-item >
      
    </ion-list>

  </ion-content>
  `
})
export class ModalPage implements AfterViewInit {
  @Input() job: any;

  constructor(
    private modalCtrl: ModalController
  ) {}

  ngAfterViewInit() {}

  dismissModal() {
    this.modalCtrl.dismiss();
  }
}