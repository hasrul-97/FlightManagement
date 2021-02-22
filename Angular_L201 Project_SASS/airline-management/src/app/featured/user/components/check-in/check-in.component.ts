import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.sass']
})
export class CheckInComponent implements OnInit {

  constructor(private userService: UserService, private toastr: ToastrService) { }
  //  VARIABLE DECLARATIONS
  date = new Date();
  modalClicked = false;
  passengerDetails: any[] = [];
  flightDetails: any[] = [];
  flightID = '';
  showPassengerDetail = false;
  IsFlightChosen = false;
  seatNumber = '';
  displayedColumns: string[] = ['name', 'age', 'passportNumber', 'isCheckedIn', 'seatNumber', 'isWheelChairRequired', 'actions'];
  passengerData: any = [];

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.userService.getFlight().subscribe((data: any) => {
      this.flightDetails = data.dataList.filter(obj => new Date(obj.flightTime) > this.date);
    });
  }

  //  THIS METHOD IS USED TO CHOOSE THE FLIGHT
  chooseFlight(flightID) {
    this.flightID = flightID;
    this.modalClicked = true;
  }

  //  THIS METHOD IS USED TO GET THE LIST OF PASSENGERS FOR A FLIGHT
  getFlightPassengerDetails() {
    if (this.flightID) {
      this.IsFlightChosen = true;
      this.userService.getPassengerForFlight(this.flightID).subscribe((data: any) => {
        this.passengerDetails = data.dataList;
        this.showPassengerDetail = true;
        this.modalClicked = false;
        this.seatNumber = '';
      });
    }
  }

  //  THIS METHOD IS USED TO UNDO CHCECK-IN FOR A PASSENGER
  checkOut(passengerData: any) {
    this.userService.checkOut(passengerData.passengerGUID).subscribe((data: any) => {
      if (data.statusCode === 200) {
        this.toastr.success(data.message);
        this.getFlightPassengerDetails();
      } else {
        this.toastr.error(data.message);
      }
    });
  }

  //  THIS METHOD IS USED TO GET THE CHOSEN PASSENGER DATA
  getPassengerData(data: any) {
    this.passengerData = data;
    this.modalClicked = true;
  }

  //  THIS METHID IS USED TO CLOSE THE MODAL
  closeModal() {
    this.modalClicked = false;
  }

  //  THIS METHOD IS USED TO RECEIVE THE SEAT NUMBER FROM THE CHILD COMPONENT
  seatNumberFromChild(seat) {
    this.seatNumber = seat;
  }

  //  THIS METHOD IS USED TO CHECK-IN THE USER
  checkin() {
    this.userService.checkin(this.passengerData.passengerGUID, this.seatNumber).subscribe((data: any) => {
      if (data.statusCode === 200) {
        this.toastr.success(data.message);
        this.getFlightPassengerDetails();
      } else {
        this.toastr.error(data.message);
      }
    });
  }


}
