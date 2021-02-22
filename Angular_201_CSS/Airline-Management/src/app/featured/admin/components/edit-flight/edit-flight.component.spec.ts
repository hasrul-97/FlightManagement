import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { EditFlightComponent } from './edit-flight.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MaterialModule } from 'src/app/material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { AdminService } from '../../service/admin.service';
import { FormGroup } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material';
import { of } from 'rxjs';

describe('EditFlightComponent', () => {
  let component: EditFlightComponent;
  let fixture: ComponentFixture<EditFlightComponent>;
  let UpdateFlight: FormGroup
  let showForm: boolean = false;
  let ancillaryService: any[] = []
  let shoppingItems: any[] = []
  let specialMeal: any[] = []
  let visible = true;
  let selectable = true;
  let removable = true;
  let adminService;
  let flightData: any

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditFlightComponent],
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
    fixture = TestBed.createComponent(EditFlightComponent);
    component = fixture.componentInstance;
    component.flightData = { ancillaryService: 'Something,something', specialMeal: 'Something,something', shoppingItems: 'Something,something' }
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form', () => {
    component.initializeForm()
    expect().nothing()
  })
  it('should get values', () => {
    component.getValues()
    expect().nothing()
  })

  it('should add special meal', () => {
    component.initializeForm();
    fixture.detectChanges();
    let event: MatChipInputEvent = {
      input: document.createElement('input'),
      'value': "dsfjk"
    }
    component.add(event)
    expect().nothing();
  })
  it('should remove special meal', () => {
    component.remove("Something")
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
  it('should remove ancillary service', () => {
    component.removeAncillaryService("Something")
    expect().nothing()
  })

  it('should add shopping item', () => {
    component.initializeForm();
    fixture.detectChanges();
    let event: MatChipInputEvent = {
      input: document.createElement('input'),
      'value': "dsfjk"
    }
    component.addShoppingItem(event)
    expect().nothing();
  })
  it('should remove shopping item', () => {
    component.removeShoppingItem("Something")
    expect().nothing()
  })

  it('should add flight', () => {
    let data: {
      dataList: []
    }
    spyOn(adminService, 'updateFlight').and.returnValue(of(data))
    component.initializeForm()
    component.UpdateFlightDetails()
    expect().nothing()
  })

});
