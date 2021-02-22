import { Component, OnInit } from '@angular/core';
import { AuthenticatorService } from 'src/app/core/authenticator/authenticator.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public authenticator: AuthenticatorService, public router: Router) { }

  ngOnInit() {
  }

  //  THIS METHOD IS USED TO MANAGE THE RESPONSIVE BUTTON OF THE NAVBAR 
  menu() {
    let isOpen = false;
    var x = document.getElementById('navigation')
    if (!(x.classList.contains('show'))) {
      x.classList.add('show')
      isOpen = true;
    }
    else {
      x.classList.remove('show')
    }
  }

}
