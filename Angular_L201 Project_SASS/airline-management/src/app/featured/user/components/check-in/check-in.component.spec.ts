import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { CheckInComponent } from './check-in.component';
import { UserService } from '../../service/user.service';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from '../../user-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from '../../home/home.component';
import { DisplayAvailableSeatComponent } from '../display-available-seat/display-available-seat.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { EditPassengerComponent } from '../edit-passenger/edit-passenger.component';
import { ManagePassengerComponent } from '../manage-passenger/manage-passenger.component';
import { ViewPassengerComponent } from '../view-passenger/view-passenger.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

describe('CheckInComponent', () => {
  let component: CheckInComponent;
  let fixture: ComponentFixture<CheckInComponent>;
  let modalClicked: boolean = false;
  let passengerDetails: any[] = []
  let flightDetails: any[] = []
  let flightID = '';
  let showPassengerDetail: boolean = false;
  let IsFlightChosen: boolean = false;
  let seatNumber = '';
  let displayedColumns: string[] = ['name', 'age', 'passportNumber', 'isCheckedIn', 'seatNumber', 'actions'];
  let passengerData: [] = []
  let userService;
  let toastr;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CheckInComponent, DisplayAvailableSeatComponent, HomeComponent, EditPassengerComponent, ManagePassengerComponent, ViewPassengerComponent],
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
    userService = user;
    fixture = TestBed.createComponent(CheckInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get data', () => {
    let data = {
      statusCode: 200,
      dataList: []
    }
    spyOn(userService, 'getFlight').and.returnValue(of(data))
    component.getData();
    expect().nothing()
  })

  it('should choose flight', () => {
    component.chooseFlight('something')
    expect().nothing()
  })

  it('should get flight data', () => {
    component.flightID = 'something'
    let data = {
      statusCode: 200,
      dataList: []
    }

    spyOn(userService, 'getPassengerForFlight').and.returnValue(of(data))
    component.getFlightPassengerDetails();
    expect(component.showPassengerDetail).toBeTruthy();
  })

  it('should checkout', () => {
    let data = {
      passengerGUID: 'something'
    }
    let response = {
      statusCode: 200,
      dataList: []
    }

    spyOn(userService, 'checkOut').and.returnValue(of(response))
    component.checkOut(data);
    expect().nothing()
  })

  it('should get passenger data', () => {
    let data: {

    }
    component.getPassengerData(data);
    expect(component.modalClicked).toBeTruthy()
  })

  it('should close modal', () => {
    component.closeModal()
    expect(component.modalClicked).toBeFalsy();
  })

  it('should get seat number', () => {
    component.seatNumberFromChild('something');
    expect().nothing()
  })

  it('should check-in', () => {
    let data = {
      passengerGUID: 'something'
    }
    component.passengerData = {
      passengerGUID: 'something'
    }
    let response = {
      statusCode: 200,
      dataList: []
    }

    spyOn(userService, 'checkin').and.returnValue(of(response))
    component.checkin();
    expect().nothing()
  })


});
