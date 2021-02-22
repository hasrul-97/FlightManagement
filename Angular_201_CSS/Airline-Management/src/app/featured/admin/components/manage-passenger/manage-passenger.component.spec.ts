import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { ManagePassengerComponent } from './manage-passenger.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { MaterialModule } from 'src/app/material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AdminService } from '../../service/admin.service';
import { of } from 'rxjs';
import { EditPassengerComponent } from '../edit-passenger/edit-passenger.component';

describe('ManagePassengerComponent', () => {
  let component: ManagePassengerComponent;
  // let edit: EditPassengerComponent
  let fixture: ComponentFixture<ManagePassengerComponent>;
  let passengerData = []
  let modalClicked: boolean = false;

  let passengerDetails: any[] = []
  let flightDetails: any[] = []
  let flightID = '';
  let showPassengerDetail: boolean = false;
  let IsFlightChosen: boolean = false;
  let dateTime = new Date();
  let displayedColumns: string[] = ['name', 'age', 'passportNumber', 'address', 'dateOfBirth', 'isSpecialMealRequired', 'ancillaryService', 'isCheckedIn', 'seatNumber', 'isWheelChairRequired', 'edit'];
  let adminService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ManagePassengerComponent, EditPassengerComponent],
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
    adminService = admin;
    fixture = TestBed.createComponent(ManagePassengerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch data', () => {
    let data = {
      dataList: []
    }

    spyOn(adminService, 'getFlight').and.returnValue(of(data))
    component.getData();
    fixture.detectChanges();
    expect(component.gotData).toBeTruthy();
  })

  it('should choose flight', () => {
    component.chooseFlight('SQ 001')
    fixture.detectChanges();
    expect(component.flightID).toContain('SQ 001')
  })

  it('should fetch data for flight', () => {
    let data = {
      dataList: []
    }
    spyOn(adminService, 'getPassengerForFlight').and.returnValue(of(data))
    component.getFlightPassengerDetails();
    fixture.detectChanges();
    expect(component.showPassengerDetail).toBeTruthy();
  })

  it('should choose passenger data', () => {
    let passenger: any[] = []
    component.editPassenger(passenger);
    fixture.detectChanges();
    expect(component.modalClicked).toBeTruthy();
  })

  it('should check date', () => {
    let passenger={
      flightTime:new Date()
    }
    component.checkdate(passenger);
    fixture.detectChanges();
    expect(component.checkdate(passenger)).toBeTruthy();
  })
  it('should check date', () => {
    let passenger={
      flightTime:new Date(2020,6,1,0,0,0)
    }
    component.checkdate(passenger);
    fixture.detectChanges();
    expect(component.checkdate(passenger)).toBeFalsy();
  })

  it('should handle event',()=>{
    let data = {
      dataList: []
    }
    spyOn(adminService,'getPassengerForFlight').and.returnValue(of(data));
    component.handle(true);
    fixture.detectChanges();
    expect(component.showPassengerDetail).toBeTruthy();
  })

});
