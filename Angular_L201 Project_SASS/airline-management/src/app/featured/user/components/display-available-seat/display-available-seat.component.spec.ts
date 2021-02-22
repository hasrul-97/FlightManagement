import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { DisplayAvailableSeatComponent } from './display-available-seat.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MaterialModule } from 'src/app/material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from '../../service/user.service';
import { of } from 'rxjs';
import { SimpleChanges } from '@angular/core';

describe('DisplayAvailableSeatComponent', () => {
  let component: DisplayAvailableSeatComponent;
  let fixture: ComponentFixture<DisplayAvailableSeatComponent>;
  let flightID = ''
  let availableSeats: any[] = []
  let seats: any[] = []
  let seatChoosed = ''
  let userService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DisplayAvailableSeatComponent],
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
    fixture = TestBed.createComponent(DisplayAvailableSeatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should choose seat', () => {
    component.seatChoosed = 'something'
    let x = document.createElement('a');
    x.setAttribute('id', 'something')
    component.chooseSeat('something', false);
    expect().nothing()
  })

  it('should fetch data', () => {
    component.flightID = 'something'
    let data: {
      statusCode: 200,
      dataList: ["1A"]
    }
    spyOn(userService, 'getAvailableSeats').and.returnValue(of(data))
    component.getFlightDetails()
    expect().nothing()
  })

  it('should align seats', () => {
    component.alignSeats()
    expect().nothing()
  })

  it('should accept changes', () => {
    component.flightID = 'something'
    component.flightGUID = 'else'
    let simpleChanges: SimpleChanges
    component.ngOnChanges(simpleChanges);
    expect().nothing()
  })

});
