import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-manage-flight',
  templateUrl: './manage-flight.component.html',
  styleUrls: ['./manage-flight.component.css']
})
export class ManageFlightComponent implements OnInit {

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.getData();
  }

  //  VARIABLE DECLARATIONS
  flightDetails: any[] = []
  showFlightDetail: boolean = false
  displayedColumns: string[] = ['flightID', 'flightName', 'flightTime', 'shoppingItem', 'specialMeal', 'ancillaryService', 'excessBaggageAllowed', 'edit'];
  dateTime = new Date();
  flightData: any[] = []
  showModal: boolean = false;

  getData() {
    this.adminService.getFlight().subscribe((data) => {
      this.flightDetails = data['dataList'];
      this.showFlightDetail = true;
    });
  }

  //  THIS METHOD IS USED TO CHECK THE DATE IF CROSSED
  checkdate(flight) {
    if (new Date(flight.flightTime) > this.dateTime)
      return true;
    else
      return false;
  }

  //  THIS METHOD IS USED TO EDIT THE FLIGHT AND CHOOSE THE FLIGHT ID
  editFlight(flight) {
    this.flightData = flight;
    this.showModal = true;
  }

  //  THIS METHOD IS USED TO HANDLE THE EVENT FROM THE CHILD
  handle($event) {
    this.showModal = false;
    this.ngOnInit();
  }

}
