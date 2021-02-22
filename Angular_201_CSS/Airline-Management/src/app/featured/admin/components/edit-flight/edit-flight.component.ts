import { Component, OnInit, EventEmitter, OnChanges, Input, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../service/admin.service';
import { MatChipInputEvent } from '@angular/material';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-flight',
  templateUrl: './edit-flight.component.html',
  styleUrls: ['./edit-flight.component.css']
})
export class EditFlightComponent implements OnInit, OnChanges {

  @Input() FlightData: any
  @Output() flight = new EventEmitter;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.FlightData !== this.flightData) {
      this.flightData = this.FlightData;
      if (this.showForm)
        this.initializeForm();
    }
  }

  constructor(private adminService: AdminService, private toastr: ToastrService) { }

  ngOnInit() {
    this.getValues();
    this.initializeForm();
  }

  //  VARIABLE DECLARATIONS
  UpdateFlight: FormGroup
  flightData: any = []
  showForm: boolean = false;
  ancillaryService: any[] = []
  shoppingItems: any[] = []
  specialMeal: any[] = []
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  getValues() {
    this.flightData.ancillaryService !== null ? this.ancillaryService = this.flightData['ancillaryService'].split(',') :
      this.ancillaryService = [];
    this.flightData.specialMeal !== null ? this.specialMeal = this.flightData['specialMeal'].split(',') : this.specialMeal = [];
    this.flightData.shoppingItem !== null ? this.shoppingItems = this.flightData['shoppingItem'].split(',') : this.shoppingItems = [];
  }

  // THIS METHOD IS USED TO INIATIALIZE FORM
  initializeForm() {
    this.UpdateFlight = new FormGroup({
      FlightName: new FormControl(this.flightData['flightName'], Validators.required),
      FlightID: new FormControl(this.flightData['flightID'], Validators.required),
      FlightTime: new FormControl(this.flightData['flightTime'], Validators.required),
      ShoppingItem: new FormControl(this.shoppingItems, Validators.required),
      SpecialMeal: new FormControl(this.specialMeal, Validators.required),
      AncillaryService: new FormControl(this.ancillaryService, Validators.required)
    })
  }


  //  THIS METHOD IS USED TO ADD SPECIAL MEAL TO THE LIST
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.specialMeal.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.UpdateFlight.controls['SpecialMeal'].setValue(this.specialMeal.toString());
  }

  //  THIS METHOD IS USED TO REMOVE SPECIAL MEAL FROM THE LIST
  remove(fruit: string): void {
    const index = this.specialMeal.indexOf(fruit);

    if (index >= 0) {
      this.specialMeal.splice(index, 1);
    }
  }

  //  THIS METHOD IS USED TO ADD SHOPPING ITEM TO THE LIST
  addShoppingItem(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.shoppingItems.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.UpdateFlight.controls['ShoppingItem'].setValue(this.shoppingItems.toString());
  }

  //  THIS METHOD IS USED TO REMOVE SHOPPING ITEM FROM THE LIST
  removeShoppingItem(item: string): void {
    const index = this.shoppingItems.indexOf(item);

    if (index >= 0) {
      this.shoppingItems.splice(index, 1);
    }
  }

  //  THIS METHOD IS USED TO ADD ANCILLARY ITEM TO THE LIST
  addAncillaryService(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.ancillaryService.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.UpdateFlight.controls['AncillaryService'].setValue(this.ancillaryService.toString());
  }

  //  THIS METHOD IS USED TO REMOVE ANCILLARY ITEM FROM THE LIST
  removeAncillaryService(item: string): void {
    const index = this.ancillaryService.indexOf(item);

    if (index >= 0) {
      this.ancillaryService.splice(index, 1);
    }
  }

  //  THIS METHOD IS USED TO UPDATE THE DETAILS AND FIRE THE CALL TO THE API
  UpdateFlightDetails() {
    this.UpdateFlight.value.AncillaryService = this.ancillaryService.toString();
    this.UpdateFlight.value.SpecialMeal = this.specialMeal.toString();
    this.UpdateFlight.value.ShoppingItem = this.shoppingItems.toString();
    this.UpdateFlight.markAllAsTouched();
    this.UpdateFlight.markAsPristine();
    if (this.UpdateFlight.valid) {
      this.adminService.updateFlight(this.UpdateFlight.value).subscribe((data) => {
        if (data['statusCode'] === 200)
          this.toastr.success(data['message'])
        else
          this.toastr.error(data['message'])
        this.flight.emit(true)
      })
    }
  }

}
