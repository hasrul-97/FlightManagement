import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public http: HttpClient) { }

  //  THIS METHOD IS USED TO GET THE FLIGHT DETAILS
  public getFlight() {
    return this.http.get(environment.apiUrl + 'Flight/GetFlightDetails');
  }

  //  THIS METHOD IS USED TO GET PASSENGER FOR THE FLIGHT
  getPassengerForFlight(flightID) {
    return this.http.get(environment.apiUrl + 'Passenger/GetPassengerForFlight?flightGUID=' + flightID)
  }

  //  THIS METHOD IS USED TO GET THE AVAILABLE SEAT FOR A FLIGHT
  getAvailableSeats(flightID) {
    return this.http.get(environment.apiUrl + 'Passenger/GetAvailableSeatsForFlight?flightGUID=' + flightID);
  }

  //  THIS METHOD IS USED TO CHECK-IN THE GIVEN PASSENGER
  checkin(passengerGUID, seatNumber) {
    return this.http.post(environment.apiUrl + 'Passenger/ChangePassengerSeat?passengerGUID=' + passengerGUID + '&seatNumber=' + seatNumber, null)
  }

  //  THIS METHOD IS USED TO UNDO CHECK-IN FOR THE PASSENGER
  checkOut(passengerGUID) {
    return this.http.post(environment.apiUrl + 'Passenger/UnCheckInPassenger?passengerGUID=' + passengerGUID, null)
  }

  //  THIS METHOD IS USED TO GET ALL THE PASSENGER
  getAllPassenger() {
    return this.http.get(environment.apiUrl + 'Passenger/GetAllPassenger');
  }

  //  THIS METHOD IS USED TO UPDATE THE PASSENGER DATA
  updatePassenger(passengerData) {
    return this.http.post(environment.apiUrl + 'Passenger/UpdatePassengerDetails', passengerData);
  }

  //  THIS METHOD IS USED TO REGISTER THE USER
  public register(userData) {
    return this.http.post(environment.apiUrl + 'Admin/AddUserToDatabase', userData);
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
