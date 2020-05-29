import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
    confirmPassword: new FormControl(null, Validators.required)
  })

  register() {
    if (!this.registerForm.valid ||
      this.registerForm.controls.password.value != this.registerForm.controls.confirmPassword.value) {
      console.log('Invalid Form');
    }
    else {
      console.log(JSON.stringify(this.registerForm.value));
      this._userService.register(JSON.stringify(this.registerForm.value)).subscribe(data => {
        console.log(data);
      })
    }
  }

  constructor(private _userService: UserService) { }

  ngOnInit(): void {
  }

}
