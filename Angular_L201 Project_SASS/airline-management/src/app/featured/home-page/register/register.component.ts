import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticatorService } from 'src/app/core/authenticator/authenticator.service';
import { UserService } from '../../user/service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  RegisterForm: FormGroup;

  constructor(private authenticator: AuthenticatorService, private userService: UserService) { }

  ngOnInit() {
    this.initializeForm();
  }

  //  THIS METHOD IS USED TO INITIALIZE THE FORM
  initializeForm() {
    this.RegisterForm = new FormGroup({
      email: new FormControl(this.authenticator.email, Validators.required)
    })
  }

  //  THIS METHOD IS USED TO REGISTER THE USER
  login() {
    if (this.RegisterForm.valid) {
      this.userService.register(this.RegisterForm.value).subscribe((data) => {
        this.authenticator.checkIfUserIsRegistered(this.RegisterForm.value.email)
      })
    }
  }

}
