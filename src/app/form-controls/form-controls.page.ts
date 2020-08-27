import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-controls',
  templateUrl: './form-controls.page.html',
  styleUrls: ['./form-controls.page.scss'],
})
export class FormControlsPage implements OnInit {
  currentTab: 'basic-elements' | 'range-sliders' | 'date-pickers' = 'basic-elements';

  constructor() { }

  ngOnInit() {
  }

  segmentChanged($event) {
    this.currentTab = $event.detail.value;
  }

}
