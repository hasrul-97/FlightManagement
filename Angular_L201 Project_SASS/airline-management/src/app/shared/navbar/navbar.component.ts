import { Component, OnInit } from '@angular/core';
import { AuthenticatorService } from 'src/app/core/authenticator/authenticator.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {

  constructor(public authenticator: AuthenticatorService, public router: Router, private toastr: ToastrService) { }

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

  makeMeAdmin() {
    this.authenticator.makeAdmin().subscribe((data: any) => {
      if (data.statusCode === 200) {
        this.toastr.success(data.message);
        this.authenticator.signOut();
        this.router.navigateByUrl('');
      } else {
        this.toastr.error(data.message);
      }
    })
  }
  revokeAdmin() {
    this.authenticator.revokeAdmin().subscribe((data: any) => {
      if (data.statusCode === 200) {
        this.toastr.success(data.message);
        this.authenticator.signOut();
        this.router.navigateByUrl('');
      } else {
        this.toastr.error(data.message);
      }
    })
  }

}
