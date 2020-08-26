import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormControlsPage } from './form-controls.page';

describe('FormControlsPage', () => {
  let component: FormControlsPage;
  let fixture: ComponentFixture<FormControlsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormControlsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormControlsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
