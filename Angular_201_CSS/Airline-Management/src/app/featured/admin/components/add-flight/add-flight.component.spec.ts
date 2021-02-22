import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { AddFlightComponent } from './add-flight.component';
import { FormGroup, FormControl } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MaterialModule } from 'src/app/material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { AdminService } from '../../service/admin.service';
import { MatChipInputEvent, MatChipInput } from '@angular/material';
import { element } from 'protractor';
import { Router } from '@angular/router';

describe('AddFlightComponent', () => {
  let component: AddFlightComponent;
  let fixture: ComponentFixture<AddFlightComponent>;
  let AddFlight: FormGroup;
  let visible = true;
  let selectable = true;
  let removable = true;
  let fruitCtrl = new FormControl();
  let specialMealsList: string[] = ["Something"];
  let shoppingItem: string[] = ["Something"];
  let ancillaryService: string[] = ["Something"];
  let adminService;
  let mat: MatChipInputEvent;
  let toastr;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddFlightComponent],
      imports: [
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        HttpClientTestingModule,
        MaterialModule,
        RouterTestingModule.withRoutes([]),]
    })
      .compileComponents();
  }));

  beforeEach(inject([AdminService,ToastrService,Router], (admin,toastr,router) => {
    adminService=admin
    fixture = TestBed.createComponent(AddFlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form', () => {
    component.initializeForm();
    fixture.detectChanges();
    expect().nothing()
  })
  it('should add', () => {
    component.initializeForm();
    fixture.detectChanges();
    let event:MatChipInputEvent={
      input: document.createElement('input'),
      'value': "dsfjk"
    }
    component.add(event)
    expect().nothing();
  })
  it('should add',()=>{
    component.remove("Something")
    fixture.detectChanges();
    expect().nothing()
  })
  it('should add shopping item', () => {
    component.initializeForm();
    fixture.detectChanges();
    let event:MatChipInputEvent={
      input: document.createElement('input'),
      'value': "dsfjk"
    }
    component.addShoppingItem(event)
    expect().nothing();
  })
  it('should add',()=>{
    component.removeShoppingItem("Something")
    fixture.detectChanges();
    expect().nothing()
  })
  it('should add ancillary item', () => {
    component.initializeForm();
    fixture.detectChanges();
    let event:MatChipInputEvent={
      input: document.createElement('input'),
      'value': "dsfjk"
    }
    component.addAncillaryService(event)
    expect().nothing();
  })
  it('should add',()=>{
    component.removeAncillaryService("Something")
    fixture.detectChanges();
    expect().nothing()
  })
  it('should add flight',()=>{
    component.AddFlightDetails()
    fixture.detectChanges();
    expect().nothing()
  })
});
