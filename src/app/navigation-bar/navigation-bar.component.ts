import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  loggedIn: boolean;

  constructor(private user: UserService, private router: Router) {
    this.updateLoggedIn();
  }

  updateLoggedIn() {
    console.log("changed value");
    this.loggedIn = this.user.loggedIn;
  }
  // logout() {
  //   this.user.logout().subscribe(
  //     data => {
  //       console.log(data);
  //       this.router.navigate(['/login']);
  //     },
  //     error => console.log(error)
  //   )
  // }

  ngOnInit(): void {
    this.user.currentMessage.subscribe(data => {
      this.loggedIn = data;
    })
  }

}
