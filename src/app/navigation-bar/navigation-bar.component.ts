import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  constructor(private user: UserService, private router: Router) { }

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
  }

}
