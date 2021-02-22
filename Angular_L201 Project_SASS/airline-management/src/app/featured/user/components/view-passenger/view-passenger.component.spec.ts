import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { ViewPassengerComponent } from './view-passenger.component';
import { MatSort } from '@angular/material';
import { UserService } from '../../service/user.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MaterialModule } from 'src/app/material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('ViewPassengerComponent', () => {
  let component: ViewPassengerComponent;
  let fixture: ComponentFixture<ViewPassengerComponent>;
  let passengerDetails: any[] = []
  let filteredPassengerDetails: any[] = []
  let filterOptions: any[] = []
  let showPassengers: boolean = false;
  let displayedColumns: string[] = ['name', 'age', 'passportNumber', 'isCheckedIn', 'isWheelChairRequired', 'address', 'dateOfBirth', 'isSpecialMealRequired', 'ancillaryService', 'flightID', 'seatNumber'];
  let dataSource;
  let userService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewPassengerComponent],
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
    fixture = TestBed.createComponent(ViewPassengerComponent);
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
    spyOn(userService, 'getAllPassenger').and.returnValue(of(data))
    component.getData();
    expect(component.showPassengers).toBeTruthy()
  })

  it('should filter', () => {
    let event = {
      checked: true,
      source: {
        id: 'passport'
      }
    }
    component.passengerDetails = [{
      passportNumber: null,
      isCheckedIn: 0,
      isWheelChairRequired: 0,
      age: 10,
    }]
    component.dataSource = {
      data: []
    }
    component.filter(event)
    expect().nothing()
  })
  it('should filter', () => {
    let event = {
      checked: true,
      source: {
        id: 'checked-in'
      }
    }
    component.passengerDetails = [{
      passportNumber: '',
      isCheckedIn: 1,
      isWheelChairRequired: 0,
      age: 10,
    }]
    component.dataSource = {
      data: []
    }
    component.filter(event)
    expect().nothing()
  })

  it('should filter', () => {
    let event = {
      checked: true,
      source: {
        id: 'notchecked-in'
      }
    }
    component.passengerDetails = [{
      passportNumber: '',
      isCheckedIn: 0,
      isWheelChairRequired: 0,
      age: 10,
    }]
    component.dataSource = {
      data: []
    }
    component.filter(event)
    expect().nothing()
  })

  it('should filter', () => {
    let event = {
      checked: true,
      source: {
        id: 'wheelchair'
      }
    }
    component.passengerDetails = [{
      passportNumber: '',
      isCheckedIn: 0,
      isWheelChairRequired: 1,
      age: 10,
    }]
    component.dataSource = {
      data: []
    }
    component.filter(event)
    expect().nothing()
  })

  it('should filter', () => {
    let event = {
      checked: true,
      source: {
        id: 'infant'
      }
    }
    component.passengerDetails = [{
      passportNumber: '',
      isCheckedIn: 0,
      isWheelChairRequired: 0,
      age: 1,
    }]
    component.dataSource = {
      data: []
    }
    component.filter(event)
    expect().nothing()
  })
});
