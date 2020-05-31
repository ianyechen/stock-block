import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  logout() {
    this.user.logout().subscribe(
      data => {
        console.log(data);
        this.user.loggedIn = false;
        this.router.navigate(['/login']);
      },
      error => {
        console.log(error)
        this.router.navigate(['/login']);
      }
    )
  }

  constructor(private user: UserService, private router: Router) {
    this.logout();
  }

  ngOnInit(): void {

  }

}
