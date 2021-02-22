import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { MatTableDataSource } from '@angular/material';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-view-passenger',
  templateUrl: './view-passenger.component.html',
  styleUrls: ['./view-passenger.component.sass']
})
export class ViewPassengerComponent implements OnInit {

  constructor(private userService: UserService) { }


  //  VARIABLE DECLARATION
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  passengerDetails: any[] = []
  filteredPassengerDetails: any[] = []
  filterOptions: any[] = []
  showPassengers: boolean = false;
  displayedColumns: string[] = ['name', 'age', 'passportNumber', 'isCheckedIn', 'isWheelChairRequired', 'address', 'dateOfBirth',
    'isSpecialMealRequired', 'ancillaryService', 'flightID', 'seatNumber'];
  dataSource;

  //  THIS METHOD IS USED TO FILTER THE DATA
  filter(event) {
    let status = event.checked
    let condition = event.source.id
    if (status) {
      this.filterOptions.push({ condition: condition, status: status })
    }
    else {
      let index = this.filterOptions.indexOf(obj => obj.condition === condition)
      this.filterOptions.splice(index, 1);
    }
    let temporaryData = [...this.passengerDetails];
    this.filteredPassengerDetails = [];
    if (this.filterOptions.length === 0) {
      this.filteredPassengerDetails = this.passengerDetails
    }
    this.filterOptions.forEach(obj => {
      switch (obj.condition) {
        case 'passport': {
          if (obj.status) {
            let filteredData = []
            filteredData = temporaryData.filter(obj => obj.passportNumber == null);
            temporaryData = filteredData;
            if (filteredData.length == 0)
              this.filteredPassengerDetails = []
            else {
              filteredData.forEach(obj => {
                this.filteredPassengerDetails.push(obj)
              })
            }
          }
        } break;
        case 'checked-in': {
          if (obj.status) {
            let filteredData = []
            filteredData = temporaryData.filter(obj => obj.isCheckedIn == 1);
            temporaryData = filteredData;
            if (filteredData.length == 0)
              this.filteredPassengerDetails = []
            else {
              filteredData.forEach(obj => {
                this.filteredPassengerDetails.push(obj)
              })
            }
          }
        } break;
        case 'notchecked-in': {
          if (obj.status) {
            let filteredData = []
            filteredData = temporaryData.filter(obj => obj.isCheckedIn === 0);
            temporaryData = filteredData;
            if (filteredData.length == 0)
              this.filteredPassengerDetails = []
            else {
              filteredData.forEach(obj => {
                this.filteredPassengerDetails.push(obj)
              })
            }
          }
        } break;
        case 'wheelchair': {
          if (obj.status) {
            let filteredData = []
            filteredData = temporaryData.filter(obj => obj.isWheelChairRequired == 1);
            temporaryData = filteredData;
            if (filteredData.length == 0)
              this.filteredPassengerDetails = []
            else {
              filteredData.forEach(obj => {
                this.filteredPassengerDetails.push(obj)
              })
            }
          }
        } break;
        case 'infant': {
          if (obj.status) {
            let filteredData = []
            filteredData = temporaryData.filter(obj => obj.age <= 2);
            temporaryData = filteredData;
            if (filteredData.length == 0)
              this.filteredPassengerDetails = []
            else {
              filteredData.forEach(obj => {
                this.filteredPassengerDetails.push(obj)
              })
            }
          }
        } break;
      }
    })
    this.dataSource.data = this.filteredPassengerDetails
  }



  ngOnInit() {
    this.getData();
  }



  getData() {
    this.userService.getAllPassenger().subscribe((data) => {
      this.passengerDetails = data['dataList'];
      this.filteredPassengerDetails = [...this.passengerDetails];
      this.showPassengers = true;
      this.dataSource = new MatTableDataSource(this.filteredPassengerDetails);
      this.dataSource.sort = this.sort;
    });
  }
}
