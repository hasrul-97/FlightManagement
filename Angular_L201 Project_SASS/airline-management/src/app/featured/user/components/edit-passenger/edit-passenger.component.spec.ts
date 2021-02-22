import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { EditPassengerComponent } from './edit-passenger.component';
import { FormGroup } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MaterialModule } from 'src/app/material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from '../../service/user.service';
import { of } from 'rxjs';
import { SimpleChanges } from '@angular/core';

describe('EditPassengerComponent', () => {
  let component: EditPassengerComponent;
  let fixture: ComponentFixture<EditPassengerComponent>;
  let UpdatePassenger: FormGroup
  let visible = true;
  let selectable = true;
  let removable = true;
  let ancillaryService: any[] = []
  let flightDetails: any[] = []
  let hasSpecialMeal: boolean = false;
  let passengerData: any[] = []
  let selectedFlight: any[] = []
  let showForm: boolean = false;
  let ancillaryServicesForFlight: any[] = []
  let userService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditPassengerComponent],
      imports: [
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        HttpClientTestingModule,
        MaterialModule,
        ToastrModule.forRoot(),
        RouterTestingModule.withRoutes([]),
      ]
    })
      .compileComponents();
  }));

  beforeEach(inject([UserService], (user) => {
    userService = user
    fixture = TestBed.createComponent(EditPassengerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('ng on changes', () => {
    component.passengerData = {
      ancillaryService: "something,something",
      name: 'something',
      age: 10,
      dateOfBirth: '01-01-1997',
      passportNumer: 'somthing',
      address: 'something',
      isSpecialMealRequired: 1
    }
    component.selectedFlight = [{
      flightGUID: 'something'
    }]
    component.showForm = true
    let simple: SimpleChanges
    component.ngOnChanges(simple)
    expect().nothing()
  })

  it('should get data', () => {
    let data = {
      dataList: [{ flightID: 'something' }]
    }
    spyOn(userService, 'getFlight').and.returnValue(of(data))
    spyOn(userService, 'getAncillarServiceForFlight').and.returnValue(of(data))
    component.passengerData = {
      flightID: 'something'
    }
    component.getData()
    expect().nothing()
  })

  it('should initialize form', () => {
    component.passengerData = {
      ancillaryService: "something,something",
      name: 'something',
      age: 10,
      dateOfBirth: '01-01-1997',
      passportNumer: 'somthing',
      address: 'something',
      isSpecialMealRequired: 1
    }
    component.selectedFlight = [{
      flightGUID: 'something'
    }]
    component.initializeForm()
    expect().nothing()
  })

  it('should choose flight', () => {
    component.flightDetails = [{
      flightGUID: 'something',
      specialMeal: 'something'
    }]
    component.chooseFlight('something')
    expect().nothing()
  })

  it('should add data', () => {
    component.passengerData = {
      ancillaryService: "something,something",
      name: 'something',
      age: 10,
      dateOfBirth: '01-01-1997',
      passportNumer: 'somthing',
      address: 'something',
      isSpecialMealRequired: 1
    }
    component.selectedFlight = [{
      flightGUID: 'something'
    }]
    component.initializeForm();
    component.passengerData = {
      passengerGUID: 'something'
    }

    component.selectedFlight = [{
      flightGUID: 'something'
    }]

    let data = {
      statusCode: 200,
      dataList: []
    }

    spyOn(userService, 'updatePassenger').and.returnValue(data)
    component.UpdatePassengerData()
    expect().nothing()
  })

});
