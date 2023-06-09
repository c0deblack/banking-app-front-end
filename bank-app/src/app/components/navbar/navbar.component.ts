import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { NavbarService } from 'src/app/services/navbar.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  selected: String = "";
  isLoggedIn: boolean = this.userService.loggedIn;

  constructor(public userService : UserService, public loginService: LoginServiceService, public navbarService : NavbarService) { }
  
  setSelected(newSelection: string) {
    this.navbarService.setSelected(newSelection);
  }
  
  ngOnInit(): void {
    this.selected = "home"
  }

}
