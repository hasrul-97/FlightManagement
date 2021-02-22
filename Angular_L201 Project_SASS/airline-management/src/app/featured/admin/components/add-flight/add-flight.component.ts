import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { AdminService } from '../../service/admin.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-flight',
  templateUrl: './add-flight.component.html',
  styleUrls: ['./add-flight.component.sass']
})
export class AddFlightComponent implements OnInit {

  constructor(private adminService: AdminService, private toastr: ToastrService, private router: Router) { }

  ngOnInit() {

    this.initializeForm();
  }


  //  THIS METHOD IS USED TO INITIALIZE THE FORM
  initializeForm() {
    this.AddFlight = new FormGroup({
      FlightID: new FormControl("", [Validators.required]),
      FlightName: new FormControl("", Validators.required),
      FlightTime: new FormControl("", Validators.required),
      ExcessBaggageAllowed: new FormControl(false, Validators.required),
      IsSpecialMeal: new FormControl(false, Validators.required),
      SpecialMeal: new FormControl(""),
      ShoppingItem: new FormControl("", Validators.required),
      AncillaryService: new FormControl([], Validators.required),
    });
  }

  //  VARIABLE DECLARATION
  AddFlight: FormGroup;
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  specialMealsList: string[] = [];
  shoppingItem: string[] = [];
  ancillaryService: string[] = [];

  //  THIS METHOD IS USED TO ADD THE SPECIAL MEAL FROM THE LIST
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.specialMealsList.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.AddFlight.controls['SpecialMeal'].setValue(this.specialMealsList.toString());
  }

  //  THIS METHOD IS USED TO REMOVE THE SPECIAL MEAL FROM THE LIST
  remove(fruit: string): void {
    const index = this.specialMealsList.indexOf(fruit);

    if (index >= 0) {
      this.specialMealsList.splice(index, 1);
    }
  }

  //  THIS METHOD IS USED TO ADD THE SHOPPING ITEM FROM THE LIST
  addShoppingItem(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.shoppingItem.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.AddFlight.controls['ShoppingItem'].setValue(this.shoppingItem.toString());
  }

  //  THIS METHOD IS USED TO REMOVE THE SHOPPING ITEM FROM THE LIST
  removeShoppingItem(item: string): void {
    const index = this.shoppingItem.indexOf(item);

    if (index >= 0) {
      this.shoppingItem.splice(index, 1);
    }
  }

  //  THIS METHOD IS USED TI ADD THE ANCILLARY SERVICE TO THE LIST
  addAncillaryService(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.ancillaryService.push(value.trim());
    }

    if (input) {
      input.value = '';
    }

    this.AddFlight.controls['AncillaryService'].setValue(this.ancillaryService.toString());
  }

  //  THIS METHOD IS USER TO REMOVE THE ANCILLAR SERVICE FROM THE LIST
  removeAncillaryService(item: string): void {
    const index = this.ancillaryService.indexOf(item);

    if (index >= 0) {
      this.ancillaryService.splice(index, 1);
    }
  }

  //  THIS METHOD IS USED TO ADD THE GIVEN FLIGHT DETAILS TO THE DATABASE
  AddFlightDetails() {
    this.AddFlight.markAsPristine();
    this.AddFlight.markAllAsTouched();
    // this.AddFlight.value.SpecialMeal = this.specialMealsList.toString();
    // this.AddFlight.value.ShoppingItem = this.shoppingItem.toString();
    // this.AddFlight.value.AncillaryService=this.ancillaryService.toString();
    this.AddFlight.value.IsSpecialMeal === true ? this.AddFlight.value.SpecialMeal = null :
      this.AddFlight.value.SpecialMeal = this.specialMealsList.toString();
    if (this.AddFlight.value.ExcessBaggageAllowed === true) {
      this.ancillaryService.push('Excess Baggage');
      this.AddFlight.controls['AncillaryService'].setValue(this.ancillaryService.toString());
    }
    this.AddFlight.value.ExcessBaggageAllowed === true ? this.AddFlight.value.ExcessBaggageAllowed = 1 :
      this.AddFlight.value.ExcessBaggageAllowed = 0;
    if (this.AddFlight.valid) {
      this.adminService.addFlight(this.AddFlight.value).subscribe((data) => {
        if (data['statusCode'] === 200) {
          this.toastr.success(data['message'])
          this.router.navigateByUrl('admin')
        }
        else
          this.toastr.error(data['message'])
      })
    }
  }

}
