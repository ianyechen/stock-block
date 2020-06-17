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

  constructor(private user: UserService, private router: Router) {  }

  ngOnInit(): void {
    this.user.currentLoggedIn.subscribe(data => {
      this.loggedIn = data;
    });
  }

}
