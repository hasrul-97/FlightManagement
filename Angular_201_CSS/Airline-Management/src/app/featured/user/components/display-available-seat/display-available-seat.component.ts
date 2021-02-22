import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-display-available-seat',
  templateUrl: './display-available-seat.component.html',
  styleUrls: ['./display-available-seat.component.css']
})
export class DisplayAvailableSeatComponent implements OnInit, OnChanges {

  @Input() flightGUID: any
  @Output() seatNumber = new EventEmitter();

  constructor(private userService: UserService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.flightID != this.flightGUID) {
      this.flightID = this.flightGUID
      this.getFlightDetails()
    }
  }

  //  VARIABLE DECLARATIONS
  flightID = ''
  availableSeats: any[] = []
  seats: any[] = []
  seatChoosed = ''

  ngOnInit() {
  }

  //  THIS METHOD IS USED TO ALIGN THE SEATS AVAILABLE FOR THE FLIGHT
  alignSeats() {
    for (let i = 1; i <= 30; i++) {
      this.seats.push({
        left: [{ seatNumber: i + 'A', occupied: this.availableSeats.includes(i + 'A') ? false : true }, { seatNumber: i + 'B', occupied: this.availableSeats.includes(i + 'B') ? false : true }, { seatNumber: i + 'C', occupied: this.availableSeats.includes(i + 'C') ? false : true }],
        right: [{ seatNumber: i + 'D', occupied: this.availableSeats.includes(i + 'D') ? false : true }, { seatNumber: i + 'E', occupied: this.availableSeats.includes(i + 'E') ? false : true }, { seatNumber: i + 'F', occupied: this.availableSeats.includes(i + 'F') ? false : true }],
      })!
    }
  }

  //  THIS METHID IS USED TO CHOOSE A PARTICULAR A SEAT FROM THE AVAILABLE LIST 
  chooseSeat(seatNumber, occupied) {
    if (!occupied) {
      if (this.seatChoosed !== '') {
        let seat = document.getElementById(this.seatChoosed)
        seat.classList.remove('choosed')
      }
      let newSeat = document.getElementById(seatNumber);
      newSeat.classList.add('choosed')
      this.seatChoosed = seatNumber;
      this.seatNumber.emit(this.seatChoosed);
    }
  }

  //  THIS METHOD IS USED TO GET THE AVAILABE SEAT FOR THE GIVEN FLIGHT DETAILS
  getFlightDetails() {
    if (this.flightID != undefined) {
      this.userService.getAvailableSeats(this.flightID).subscribe((data) => {
        this.availableSeats = data['dataList']
        this.alignSeats();
      })
    }
  }

}
