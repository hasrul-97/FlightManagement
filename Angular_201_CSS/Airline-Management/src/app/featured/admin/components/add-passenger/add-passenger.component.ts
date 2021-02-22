import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { AdminService } from '../../service/admin.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-passenger',
  templateUrl: './add-passenger.component.html',
  styleUrls: ['./add-passenger.component.css']
})
export class AddPassengerComponent implements OnInit {

  constructor(private adminService: AdminService, private toastr: ToastrService, private router: Router) { }
  //  VARIABLE DECLARATIONS
  AddPassenger: FormGroup
  visible = true;
  selectable = true;
  removable = true;
  age = 0;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  ancillaryService: any[] = []
  flightDetails: any[] = []
  hasSpecialMeal: boolean = false;
  ancillaryServiceForFlight: any[] = []
  specialMealForFlight: any[] = []

  ngOnInit() {
    this.getData();
    this.initializeForm();
  }


  getData() {
    this.adminService.getFlight().subscribe((data) => {
      this.flightDetails = data['dataList'];
    });
  }

  //  THIS METHOD IS USED TO INITIALIZE THE FORM
  initializeForm() {

    this.AddPassenger = new FormGroup({
      Name: new FormControl("", Validators.required),
      Age: new FormControl("", Validators.required),
      DateOfBirth: new FormControl("", Validators.required),
      PassportNumber: new FormControl("", Validators.required),
      Address: new FormControl("", Validators.required),
      FlightGUID: new FormControl("", Validators.required),
      IsSpecialMealRequired: new FormControl(false),
      IsWheelChairRequired: new FormControl(false),
      AncillaryService: new FormControl([]),
      SpecialMeal: new FormControl("")
    })

  }

  //  THIS METHOD IS USED TO CALCULATE AGE FOR THE GIVEN DATE OF BIRTH
  calculateAge() {
    let dateOfBirth: Date = this.AddPassenger.value.DateOfBirth
    let age = 0;
    let today = new Date();
    age += today.getFullYear() - dateOfBirth.getFullYear();
    if (today.getMonth() < dateOfBirth.getMonth()) {
      age--;
    }
    else if (today.getMonth() === dateOfBirth.getMonth()) {
      if (today.getDate() < dateOfBirth.getDate()) {
        age--;
      }
    }
    this.age = age;
    this.AddPassenger.controls['Age'].setValue(age);
  }

  //  THIS METHOD IS USED TO ADD THE ANCILLARY ITEM TO THE LIST
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

    this.AddPassenger.controls['AncillaryService'].setValue(this.ancillaryService.toString());
  }

  //  THIS METHOD IS USED TO REMOVE THE ANCILLARY ITEM FROM THE LIST
  removeAncillaryService(item: string): void {
    const index = this.ancillaryService.indexOf(item);

    if (index >= 0) {
      this.ancillaryService.splice(index, 1);
    }
  }

  //   THIS METHOD IS USED TO ADD THE GVEN PASSENGER DETAIL TO THE API
  AddPassengerData() {
    this.AddPassenger.markAllAsTouched();
    this.AddPassenger.markAsPristine();
    if (this.AddPassenger.value.IsSpecialMealRequired === null) {
      this.AddPassenger.controls['IsSpecialMealRequired'].setValue(false);
    }
    else if (this.AddPassenger.value.IsSpecialMealRequired === true) {
      if (this.AddPassenger.value.SpecialMeal === "") {
        this.AddPassenger.controls['SpecialMeal'].setErrors(Validators.required);
      }
    }
    if (this.ancillaryService.length === 0) {
      this.AddPassenger.value.AncillaryService = null;
    } else {
      this.AddPassenger.value.AncillaryService = this.ancillaryService.toString();
    }
    console.log(this.AddPassenger)
    this.AddPassenger.value.IsSpecialMealRequired == true ? this.AddPassenger.value.IsSpecialMealRequired = 1 : this.AddPassenger.value.IsSpecialMealRequired = 0;
    this.AddPassenger.value.IsWheelChairRequired == true ? this.AddPassenger.value.IsWheelChairRequired = 1 : this.AddPassenger.value.IsWheelChairRequired = 0;
    // this.
    if (this.AddPassenger.valid) {
      this.adminService.addPassenger(this.AddPassenger.value).subscribe((data) => {
        if (data['statusCode'] === 200) {
          this.toastr.success(data['message'])
          this.router.navigateByUrl('admin/manage-passenger')
        }
        else
          this.toastr.error(data['message'])
      },
        (error) => {
          console.log(error)
        })
    }
  }

  //  THIS METHOD IS USED TO CHOOSE A FLIGHT
  chooseFlight(data) {
    let flight = this.flightDetails.filter(obj => obj.flightGUID == data)
    this.adminService.getAncillarServiceForFlight(flight[0]['flightID']).subscribe((data) => {
      this.ancillaryServiceForFlight = data['dataList'];
      this.adminService.getSpecialMealsForFlight(flight[0]['flightID']).subscribe((data) => {
        this.specialMealForFlight = data['dataList']
      })
    })
    if (flight[0]['specialMeal'] != undefined)
      this.hasSpecialMeal = true
    else
      this.hasSpecialMeal = false;
  }

}
