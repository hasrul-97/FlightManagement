import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-manage-passenger',
  templateUrl: './manage-passenger.component.html',
  styleUrls: ['./manage-passenger.component.sass']
})
export class ManagePassengerComponent implements OnInit {

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.getData();
    // this.adminService.getPassengerForFlight(flightID)
  }

  //  THIS METHOD USED TO GET THE FLIGHT DATA FROM THE DATABASE 
  public getData() {
    this.adminService.getFlight().subscribe((data) => {
      this.flightDetails = data['dataList'];
      this.gotData = true;
    })
  }

  //  THIS METHOD IS USED TO CHOOSE A PARTICULAR FLIGHT
  chooseFlight(flightID) {
    this.flightID = flightID
  }

  //  THIS METHOD IS USED TO FETCH THE LIST OF PASSENGER FOR A GIVEN FLIGHT 
  getFlightPassengerDetails() {
    this.IsFlightChosen = true;
    this.adminService.getPassengerForFlight(this.flightID).subscribe((data) => {
      this.passengerDetails = data['dataList'];
      this.showPassengerDetail = true;
    })
  }

  //  THIS METHOD IS USED TO CHOOSE A PARTICULAR PASSENGER TO EDIT
  editPassenger(passenger) {
    this.passengerData = passenger
    this.modalClicked = true;
  }

  //  THIS METHOD IS USED TO CHECK IF THE DATE AHS CROSSED
  checkdate(passenger) {
    if (new Date(passenger.flightTime) > this.dateTime)
      return true;
    else
      return false;
  }

  //  THIS METHOD IS USED TO HANDLE THE EVENT FROM THE CHILD
  handle(event) {
    if (event) {
      this.adminService.getPassengerForFlight(this.flightID).subscribe((data) => {
        this.passengerDetails = data['dataList'];
        this.showPassengerDetail = true;
      })
    }
  }

  //  VARIABLE DECLARATIONS
  passengerData = []
  modalClicked: boolean = false;
  gotData: boolean = false;

  passengerDetails: any[] = []
  flightDetails: any[] = []
  flightID = '';
  showPassengerDetail: boolean = false;
  IsFlightChosen: boolean = false;
  dateTime = new Date();
  displayedColumns: string[] = ['name', 'age', 'passportNumber', 'address', 'dateOfBirth', 'isSpecialMealRequired', 'ancillaryService', 'isCheckedIn', 'seatNumber', 'isWheelChairRequired', 'edit'];

}
