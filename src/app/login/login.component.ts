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
        this.errorMessage = error.error.message;
      })
      console.log(JSON.stringify(this.loginForm.value));
    }
    else console.log('Invalid');
  }

  constructor(private _user: UserService, private _router: Router) {
    // this.user.loggedIn = true;
    // this.loggedIn = true;
    this._user.changeLoggedIn(false);
  }

  ngOnInit(): void {
  }

}
