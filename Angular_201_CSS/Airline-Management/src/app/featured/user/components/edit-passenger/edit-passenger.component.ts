import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { UserService } from '../../service/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-passenger',
  templateUrl: './edit-passenger.component.html',
  styleUrls: ['./edit-passenger.component.css']
})
export class EditPassengerComponent implements OnInit, OnChanges {


  //  VARIABLE DECLARATIONS
  UpdatePassenger: FormGroup
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  ancillaryService: any[] = [];
  flightDetails: any[] = [];
  hasSpecialMeal = false;
  passengerData: any = [];
  selectedFlight: any[] = [];
  showForm = false;
  ancillaryServicesForFlight: any[] = [];
  @Input() PassengerData: any;
  @Output() passenger = new EventEmitter();

  constructor(private userService: UserService, private toastr: ToastrService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.PassengerData !== this.passengerData) {
      this.passengerData = this.PassengerData;
      this.userService.getAncillarServiceForFlight(this.passengerData.flightID).subscribe((data: any) => {
        this.ancillaryServicesForFlight = data.dataList;
      });
      if (this.showForm) {
        this.initializeForm();
      }
    }
  }

  ngOnInit() {
    this.getData();

  }

  getData() {
    this.passengerData = this.PassengerData;
    this.userService.getFlight().subscribe((data: any) => {
      this.flightDetails = data.dataList;
      this.selectedFlight = this.flightDetails.filter(obj => obj.flightID === this.passengerData.flightID);
      this.userService.getAncillarServiceForFlight(this.passengerData.flightID).subscribe((second: any) => {
        this.ancillaryServicesForFlight = second.dataList;
      });
      this.initializeForm();
      this.showForm = true;
    });
  }

  //  THIS METHOD IS USED TO INITIALIZE FORM
  initializeForm() {
    if (this.passengerData.ancillarService != null) {
      this.ancillaryService = this.passengerData.ancillaryService.split(',');
    }
    this.UpdatePassenger = new FormGroup({
      Name: new FormControl(this.passengerData.name, Validators.required),
      Age: new FormControl(this.passengerData.age, Validators.required),
      DateOfBirth: new FormControl(this.passengerData.dateOfBirth, Validators.required),
      PassportNumber: new FormControl(this.passengerData.passportNumber, Validators.required),
      Address: new FormControl(this.passengerData.address, Validators.required),
      FlightGUID: new FormControl({ value: this.selectedFlight[0].flightGUID, disabled: true }, Validators.required),
      IsSpecialMealRequired: new FormControl({ value: this.passengerData.isSpecialMealRequired === 1, disabled: true }),
      IsWheelChairRequired: new FormControl({ value: this.passengerData.isWheelChairRequired === 1, disabled: true }),
      AncillaryService: new FormControl(this.ancillaryService, Validators.required)
    });

  }

  //  THIS METHOD IS USED TOO UPADTE THE PASSENGER DATA
  UpdatePassengerData() {
    this.UpdatePassenger.markAllAsTouched();
    this.UpdatePassenger.markAsPristine();
    this.UpdatePassenger.value.IsSpecialMealRequired === true ? this.UpdatePassenger.value.IsSpecialMealRequired = 1
      : this.UpdatePassenger.value.IsSpecialMealRequired = 0;
    this.UpdatePassenger.value.AncillaryService = this.UpdatePassenger.value.AncillaryService.toString();
    this.UpdatePassenger.value.PassengerGUID = this.passengerData.passengerGUID;
    this.UpdatePassenger.value.FlightGUID = this.selectedFlight[0].flightGUID;
    if (this.UpdatePassenger.valid) {
      this.userService.updatePassenger(this.UpdatePassenger.value).subscribe((data: any) => {
        if (data.statusCode === 200) {
          this.toastr.success(data.message);
        } else {
          this.toastr.error(data.message);
        }
        this.passenger.emit(true);
      });
    }
  }

  //  THIS METHOD IS USED TO CHOOSE THE FLIGHT DETAILS FROM THE LIST
  chooseFlight(data) {
    const flight = this.flightDetails.filter(obj => obj.flightGUID === data);
    if (flight[0].specialMeal !== undefined) {
      this.hasSpecialMeal = true;
    } else {
      this.hasSpecialMeal = false;
    }
  }

}
