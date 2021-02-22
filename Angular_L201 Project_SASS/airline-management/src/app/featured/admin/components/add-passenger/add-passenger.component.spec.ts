import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { AddPassengerComponent } from './add-passenger.component';
import { FormGroup } from '@angular/forms';
import { AdminService } from '../../service/admin.service';
import { of } from 'rxjs';
import { MatChipInputEvent } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MaterialModule } from 'src/app/material.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('AddPassengerComponent', () => {
  let component: AddPassengerComponent;
  let fixture: ComponentFixture<AddPassengerComponent>;
  let AddPassenger: FormGroup
  let visible = true;
  let selectable = true;
  let removable = true;
  let ancillaryService: any[] = []
  let flightDetails: any[] = [{ flightGUID: 'something', flightID: 'ljhjs' }]
  let hasSpecialMeal: boolean = false;
  let ancillaryServiceForFlight: any[] = ["Something"]
  let specialMealForFlight: any[] = []
  let adminService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddPassengerComponent],
      imports: [
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        HttpClientTestingModule,
        MaterialModule,
        RouterTestingModule.withRoutes([]),]
    })
      .compileComponents();
  }));

  beforeEach(inject([AdminService], (admin) => {
    adminService = admin
    fixture = TestBed.createComponent(AddPassengerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get data', () => {
    let data = {
      dataList: []
    }

    spyOn(adminService, 'getFlight').and.returnValue(of(data))
    component.getData()
    expect().nothing()
  })
  it('should initialize form', () => {
    component.initializeForm();
    expect().nothing()
  })

  it('should calculate age', () => {
    component.initializeForm()
    component.calculateAge();
    expect().nothing()
  })

  it('should add ancillary service', () => {
    component.initializeForm();
    fixture.detectChanges();
    let event: MatChipInputEvent = {
      input: document.createElement('input'),
      'value': "dsfjk"
    }
    component.addAncillaryService(event)
    expect().nothing();
  })
  it('should add', () => {
    component.removeAncillaryService("Something")
    fixture.detectChanges();
    expect().nothing()
  })

  it('should choose flight', () => {

    let data = {
      dataList: []
    }

    spyOn(adminService, 'getAncillarServiceForFlight').and.returnValue(of(data))
    spyOn(adminService, 'getSpecialMealsForFlight').and.returnValue(of(data))

    component.chooseFlight('something')
    expect().nothing()
  })
  it('should add passenger', () => {
    component.initializeForm();
    component.AddPassengerData()
    expect().nothing()
  })
});
