import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error: boolean;
  errorMessage: string;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, Validators.required)
  });

  cancelAlert() {
    this.error = false;
  }

  login() {

    if (this.loginForm.valid) {

      this._user.login(JSON.stringify(this.loginForm.value)).subscribe(data => {
        console.log(data);
        this._user.changeLoggedIn(true);
        this._router.navigate(['/transactions']);
      }, error => {
        console.log(error);
        this.error = true;
        if (error.error.message.includes("username")) this.errorMessage = "Incorrect email. Please try again.";
        else this.errorMessage = "Incorrect password. Please try again.";
      });

      console.log("The forms values are: " + JSON.stringify(this.loginForm.value));

    }

    else {
      console.log('Invalid form.');
      this.error = true;
      this.errorMessage = "Invalid inputs. Please try again.";
    }

  }

  constructor(private _user: UserService, private _router: Router) {
    this._user.changeLoggedIn(false);
  }

  ngOnInit(): void { }

}
