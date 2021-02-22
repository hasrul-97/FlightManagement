import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../service/user.service';
import { MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-manage-passenger',
  templateUrl: './manage-passenger.component.html',
  styleUrls: ['./manage-passenger.component.css']
})
export class ManagePassengerComponent implements OnInit {

  constructor(private userService: UserService) { }

  //  VARIABLE DECLARATION
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  passengerDetails: any[] = [];
  showPassengerDetail = false;
  dataSource;
  dateTime = new Date();
  passengerData: any[] = []
  displayedColumns: string[] = ['name', 'age', 'passportNumber', 'address', 'dateOfBirth', 'isSpecialMealRequired',
    'ancillaryService', 'isCheckedIn', 'flightID', 'seatNumber', 'isWheelChairRequired', 'edit'];
  modalClicked = false;
  updatedPassengerData: any[] = []

  ngOnInit() {
    this.getFlightPassengerDetails()
  }

  //   THIS METHOD IS USED TO GET THE LIST OF PASSNEGERES FROM THE DATABASE
  getFlightPassengerDetails() {
    this.userService.getAllPassenger().subscribe((data) => {
      this.passengerDetails = data['dataList'];
      this.showPassengerDetail = true;
      this.dataSource = new MatTableDataSource(this.passengerDetails);
      this.dataSource.sort = this.sort;
    })
  }

  //   THIS METHOD IS USED TO EDIT THE PASSENGER BY CHOOSING THE PASSENGER DATA
  editPassenger(passenger) {
    this.passengerData = passenger;
    this.modalClicked = true;
  }

  //   THIS METHOD IS USER TO CLOSE THE MODAL
  closeModal() {
    this.modalClicked = false;
  }

  //  THIS METHOD IS USED TO HANDLE THE EVENT FROM THE CHILD COMPONENT
  handle(event) {
    if (event) {
      this.ngOnInit();
    }
  }

  //  THIS METHOD IS USED TO CHECK IF THE DATE HAS CROSSED
  checkDate(passenger) {
    if (new Date(passenger.flightTime) > this.dateTime)
      return true;
    else
      return false;
  }
}
