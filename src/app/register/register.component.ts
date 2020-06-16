import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  errorMessage: String;
  error: Boolean;
  registerForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
    confirmPassword: new FormControl(null, Validators.required)
  })

  cancelAlert() {
    this.error = false;
  }

  register() {
    if (!this.registerForm.valid) {
      this.errorMessage = "Invalid inputs. Please try again.";
      this.error = true;
    }
    else if (this.registerForm.controls.password.value != this.registerForm.controls.confirmPassword.value) {
      console.log('Invalid Form');
      this.errorMessage = "Passwords do not match. Please try again.";
      this.error = true;
    }
    else {
      console.log(JSON.stringify(this.registerForm.value));
      this._userService.register(JSON.stringify(this.registerForm.value)).subscribe(data => {
        console.log(data);
        this._router.navigate(['/login']);
      }, error => {
        console.log(error.error.errmsg);
        this.error = true;
        if (error.error.errmsg.includes("email_1")) this.errorMessage = "Email has been used. Please try again.";
        else if (error.error.errmsg.includes("username_1")) this.errorMessage = "Username has been used. Please try again.";
        console.log(this.errorMessage);
      })
    }
  }

  constructor(private _userService: UserService, private _router: Router) {
    this._userService.changeLoggedIn(false);
  }

  ngOnInit(): void {
  }

}
