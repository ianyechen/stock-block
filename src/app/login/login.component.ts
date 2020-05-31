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

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, Validators.required)
  });

  login() {
    if (this.loginForm.valid) {
      this._user.login(JSON.stringify(this.loginForm.value)).subscribe(data => {
        console.log(data);
        console.log("LOGGED IN");
        this._router.navigate(['/transactions']);
      })
      console.log(JSON.stringify(this.loginForm.value));
    }
    else console.log('Invalid');
  }

  constructor(private _user: UserService, private _router: Router) { }

  ngOnInit(): void {
  }

}
