import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { ManageFlightComponent } from './manage-flight.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MaterialModule } from 'src/app/material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { AdminService } from '../../service/admin.service';
import { of } from 'rxjs';
import { EditFlightComponent } from '../edit-flight/edit-flight.component';
import { exec } from 'child_process';

describe('ManageFlightComponent', () => {
  let component: ManageFlightComponent;
  let fixture: ComponentFixture<ManageFlightComponent>;
  let flightDetails: any[] = []
  let showFlightDetail: boolean = false
  let displayedColumns: string[] = ['flightID', 'flightName', 'flightTime', 'shoppingItem', 'specialMeal', 'ancillaryService', 'excessBaggageAllowed', 'edit'];
  let dateTime = new Date();
  let flightData: any[] = []
  let showModal: boolean = false;
  let adminService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ManageFlightComponent, EditFlightComponent],
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
    fixture = TestBed.createComponent(ManageFlightComponent);
    component = fixture.componentInstance;
    let flight: {
      flightTime: '01/01/2020'
    }
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get data', () => {
    let data: {
      'dataList': []
    }
    spyOn(adminService, 'getFlight').and.returnValue(of(data))
    component.getData();
    expect().nothing()
  })


  it('should edit flight', () => {
    let flight: {
      flightTime: '01/01/2020'
    }
    component.editFlight(flight)
    expect().nothing()
  })

  it('should handle', () => {
    component.handle(event);
    expect().nothing()
  })
  it('should check date', () => {
    let flight: {
      flightTime: '01/01/2020'
    }
    component.checkdate(flight)
    expect().nothing()
  })
});
