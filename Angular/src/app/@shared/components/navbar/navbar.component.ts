import { DomElementSchemaRegistry } from "@angular/compiler";
import { Component, OnInit } from "@angular/core";
import { LogoutComponent } from '../logout/logout.component';
import { AuthService } from "src/app/@core/services/auth.service";

@Component({
  selector: "tnv-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  isNavbarCollapsed = true;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    if(window.location.pathname.includes('welcome')){
      

    }
    console.log(this.authService.getCurrentUser().faction);
  }
}
