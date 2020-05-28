import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
    if (this.loginForm.valid) console.log(JSON.stringify(this.loginForm.value));
    else console.log('Invalid');
  }

  constructor() { }

  ngOnInit(): void {
  }

}
