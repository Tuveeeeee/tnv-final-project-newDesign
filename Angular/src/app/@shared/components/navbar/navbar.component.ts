import { DomElementSchemaRegistry } from "@angular/compiler";
import { Component, OnInit } from "@angular/core";
import { LogoutComponent } from '../logout/logout.component';
import { AuthService } from "src/app/@core/services/auth.service";
import { HostListener } from "@angular/core";




@Component({
  selector: "tnv-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})


export class NavbarComponent implements OnInit {
  isNavbarCollapsed = true;
  navBarShadowBlueController: boolean = false;
  navBarShadowRedController: boolean = false;
  navbarShowController: boolean = false;
  prevScrollPosition: number = document.documentElement.scrollTop;
  scrollPosition: number = document.documentElement.scrollTop;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.shadowController();
    this.prevScrollPosition=document.documentElement.scrollTop;
  }

  shadowController(){
    if(this.authService.getCurrentUser().faction=='red'){
      this.navBarShadowRedController=true;
    }else{
      this.navBarShadowBlueController=true;
    }
  }

  @HostListener("document:scroll")
  scrollFunction(){
    this.scrollPosition=document.documentElement.scrollTop;
    if(this.scrollPosition > this.prevScrollPosition){
      this.navbarShowController=true;
    }else{
      this.navbarShowController=false;
    }
    this.prevScrollPosition=this.scrollPosition;
  }
}
