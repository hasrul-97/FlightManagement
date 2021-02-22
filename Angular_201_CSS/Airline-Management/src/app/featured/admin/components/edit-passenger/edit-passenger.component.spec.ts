import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { EditPassengerComponent } from './edit-passenger.component';
import { FormGroup } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MaterialModule } from 'src/app/material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { AdminService } from '../../service/admin.service';
import { of } from 'rxjs';
import { UserService } from 'src/app/featured/user/service/user.service';
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
  let adminService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditPassengerComponent],
      imports: [
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        HttpClientTestingModule,
        MaterialModule,
        RouterTestingModule.withRoutes([]),]
    })
      .compileComponents();
  }));

  beforeEach(inject([UserService], (admin) => {
    adminService = admin
    fixture = TestBed.createComponent(EditPassengerComponent);
    component = fixture.componentInstance;
    // component.passengerData = { flightID: 'lkfjd',ancillaryService:"s,s" }
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get data', () => {
    let data = {
      dataList: []
    }
    component.passengerData = { flightID: 'asd' }
    spyOn(adminService, 'getFlight').and.returnValue(of(data))
    spyOn(adminService, 'getAncillarServiceForFlight').and.returnValue(of(data))

    component.getData();
    expect().nothing()
  })

  it('should initialize form', () => {
    component.passengerData = {
      ancillaryService: 'Something,something', specialMeal: 'Something,something', shoppingItems: 'Something,something'
    }
    component.selectedFlight = [{ flightGUID: 'lsdjhklj' }]
    component.initializeForm()
    expect().nothing()
  })

  it('should choose flight', () => {
    component.flightDetails = [{
      flightGUID: 'something',
      specialMeal: 'rice'
    }]
    component.chooseFlight('something')
    expect().nothing()
  })

  it('should update details', () => {
    component.selectedFlight = [{ flightGUID: 'lsdjhklj' }]
    component.passengerData = {
      'ancillaryService': 'Something,Something'
    }
    component.initializeForm()
    component.UpdatePassengerData()
    expect().nothing()
  })

  it('ng on changes', () => {
    component.PassengerData = { name: 'something' }
    component.passengerData = { name: 'something else' }
    component.selectedFlight = [{ flightGUID: 'lsdjhklj' }]
    component.passengerData = {
      'ancillaryService': 'Something,Something'
    }
    component.showForm = true
    let simple: SimpleChanges
    component.ngOnChanges(simple)
    expect().nothing()
  })
});
