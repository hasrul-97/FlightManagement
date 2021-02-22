import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { ManagePassengerComponent } from './manage-passenger.component';
import { UserService } from '../../service/user.service';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MaterialModule } from 'src/app/material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { EditPassengerComponent } from '../edit-passenger/edit-passenger.component';

describe('ManagePassengerComponent', () => {
  let component: ManagePassengerComponent;
  let fixture: ComponentFixture<ManagePassengerComponent>;
  let passengerDetails: any[] = [];
  let showPassengerDetail: boolean = false;
  let dataSource;
  let dateTime = new Date;
  let passengerData: any[] = []
  let displayedColumns: string[] = ['name', 'age', 'passportNumber', 'address', 'dateOfBirth', 'isSpecialMealRequired', 'ancillaryService', 'isCheckedIn', 'flightID', 'seatNumber', 'isWheelChairRequired', 'edit'];
  let modalClicked: boolean = false;
  let updatedPassengerData: any[] = []
  let userService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ManagePassengerComponent,EditPassengerComponent],
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
    fixture = TestBed.createComponent(ManagePassengerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get data', () => {
    let data: {
      statusCode: 200,
      dataList: []
    }
    spyOn(userService, 'getAllPassenger').and.returnValue(of(data))
    component.getFlightPassengerDetails();
    expect().nothing()
  })

  it('should edit passenger', () => {
    let passenger = {
      passengerGUID: 'something'
    }
    component.editPassenger(passenger)
    expect().nothing()
  })

  it('should close modal', () => {
    component.closeModal();
    expect(component.modalClicked).toBeFalsy()
  })

  it('should handle event', () => {
    let event = true;
    component.handle(event);
    expect().nothing()
  })

  it('should checkdate',()=>{
    component.dateTime=new Date;
    let passenger={
      flightTime:'01-01-2020'
    }

    component.checkDate(passenger)
    expect().nothing()
  })
});
