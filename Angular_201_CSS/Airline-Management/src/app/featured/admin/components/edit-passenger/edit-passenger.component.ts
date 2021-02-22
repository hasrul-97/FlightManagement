import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/featured/user/service/user.service';

@Component({
  selector: 'app-edit-passenger',
  templateUrl: './edit-passenger.component.html',
  styleUrls: ['./edit-passenger.component.css']
})
export class EditPassengerComponent implements OnInit, OnChanges {

  @Input() PassengerData: any
  @Output() passenger = new EventEmitter;

  constructor(private userService: UserService, private toastr: ToastrService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.PassengerData !== this.passengerData) {
      this.passengerData = this.PassengerData;
      if (this.showForm)
        this.initializeForm();
    }
  }

  ngOnInit() {
    this.passengerData = this.PassengerData
    this.getData();

  }

  //  VARIABLE DECLARATIONS
  UpdatePassenger: FormGroup
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  ancillaryService: any[] = []
  flightDetails: any = []
  hasSpecialMeal: boolean = false;
  passengerData: any = []
  selectedFlight: any[] = []
  showForm: boolean = false;
  ancillaryServicesForFlight: any[] = []

  getData() {
    this.userService.getFlight().subscribe((data) => {
      this.flightDetails = data['dataList'];
      this.selectedFlight = this.flightDetails.filter(obj => obj.flightID === this.passengerData['flightID']);
      this.userService.getAncillarServiceForFlight(this.passengerData['flightID']).subscribe((data) => {
        this.ancillaryServicesForFlight = data['dataList'];
      });
      this.initializeForm();
      this.showForm = true;
    });
  }

  //  THIS METHOD IS USED TI INITIALIZE THE FORM
  initializeForm() {
    if (this.passengerData['ancillaryService'] != null)
      this.ancillaryService = this.passengerData['ancillaryService'].split(',')
    this.UpdatePassenger = new FormGroup({
      Name: new FormControl(this.passengerData['name'], Validators.required),
      Age: new FormControl(this.passengerData['age'], Validators.required),
      DateOfBirth: new FormControl(this.passengerData['dateOfBirth'], Validators.required),
      PassportNumber: new FormControl(this.passengerData['passportNumber'], Validators.required),
      Address: new FormControl(this.passengerData['address'], Validators.required),
      FlightGUID: new FormControl({ value: this.selectedFlight[0]['flightGUID'], disabled: true }, Validators.required),
      IsSpecialMealRequired: new FormControl(this.passengerData['isSpecialMealRequired'] === 1, Validators.required),
      IsWheelChairRequired: new FormControl(this.passengerData['isWheelChairRequired'] === 1, Validators.required),
      AncillaryService: new FormControl(this.ancillaryService, Validators.required)
    })
  }

  //  THIS METHOD IS SUED TO UPDATE THE PASSENGER DETAILS AND SEND IT TO THE API
  UpdatePassengerData() {
    this.UpdatePassenger.markAllAsTouched();
    this.UpdatePassenger.markAsPristine();
    this.UpdatePassenger.value.IsSpecialMealRequired == true ? this.UpdatePassenger.value.IsSpecialMealRequired = 1 : this.UpdatePassenger.value.IsSpecialMealRequired = 0;
    this.UpdatePassenger.value.IsWheelChairRequired == true ? this.UpdatePassenger.value.IsWheelChairRequired = 1 : this.UpdatePassenger.value.IsWheelChairRequired = 0;
    this.UpdatePassenger.value.AncillaryService = this.UpdatePassenger.value.AncillaryService.toString();
    this.UpdatePassenger.value.PassengerGUID = this.passengerData['passengerGUID']
    this.UpdatePassenger.value.FlightGUID = this.selectedFlight[0]['flightGUID']
    if (this.UpdatePassenger.valid) {
      this.userService.updatePassenger(this.UpdatePassenger.value).subscribe((data) => {
        if (data['statusCode'] === 200)
          this.toastr.success(data['message'])
        else
          this.toastr.error(data['message'])
        this.passenger.emit(true)
      },
        (error) => {
          console.log(error)
        })
    }
  }

  //  THIS METHOD IS USED TO CHOOSE THE FLIGHT
  chooseFlight(data) {
    let flight = this.flightDetails.filter(obj => obj.flightGUID == data)
    if (flight[0]['specialMeal'] != undefined)
      this.hasSpecialMeal = true
    else
      this.hasSpecialMeal = false;
  }

}
