import { Component, OnInit } from '@angular/core';
import { AuthenticatorService } from 'src/app/core/authenticator/authenticator.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public authenticator:AuthenticatorService) { }

  ngOnInit() {
  }

}
