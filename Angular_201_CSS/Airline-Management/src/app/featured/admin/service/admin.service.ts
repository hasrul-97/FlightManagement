import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { env } from 'process';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(public http: HttpClient) { }

  //  THIS METHOD IS USED TO ADD FLIGHT
  public addFlight(data: any) {
    return this.http.post(environment.apiUrl + 'Flight/AddFlight', data);
  }

  //  THIS METHOD IS USED TO GET THE LIST OF FLIGHTS
  getFlight() {
    return this.http.get(environment.apiUrl + 'Flight/GetFlightDetails');
  }

  //  THIS METHOD IS USED TO ADD THE PASSENGER
  addPassenger(data: any) {
    return this.http.post(environment.apiUrl + 'Passenger/AddPassenger', data)
  }

  //  THIS METHOD IS USED TO GET THE LIST OF PASSENGERS FOR A FLIGHT
  getPassengerForFlight(flightID) {
    return this.http.get(environment.apiUrl + 'Passenger/GetPassengerForFlight?flightGUID=' + flightID)
  }

  //  THIS METHOD IS USED TO UPDATE THE FLIGHT DETAILS
  updateFlight(data) {
    return this.http.post(environment.apiUrl + 'Flight/UpdateFlightService', data);
  }

  //  THIS METHOD IS USED TO FETCH THE ANCILLARY ITEMS FOR THE FLIGHT
  getAncillarServiceForFlight(flightID) {
    return this.http.get(environment.apiUrl + 'Flight/GetAncillaryServices?flightID=' + flightID)
  }

  //  THIS METHOD IS USED TO FETCH THE SHOPPING ITEMS FOR THE FLIGHT
  getShoppingItemForFlight(flightId) {
    return this.http.get(environment.apiUrl + 'Flight/GetShoppingItems?flightID=' + flightId)
  }

  //  THIS METHOD IS USED TO FETCH THE SPECIAL MEALS FOR THE FLIGHT
  getSpecialMealsForFlight(flightId) {
    return this.http.get(environment.apiUrl + 'Flight/GetSpecialMeals?flightID=' + flightId)
  }

}
