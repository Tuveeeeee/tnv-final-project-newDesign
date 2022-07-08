import { User } from './../../../models/user';
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/@core/services/auth.service";
import { LoginDTO } from './../../../models/user';

@Component({
  selector: "tnv-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  flagFactionError: boolean=false;
  totalFactionBlue: number=0;
  totalFactionRed: number=0;
  difference: number=0;


  totalFaction(users: User[]){
    for(let user of users){
      if(user.faction=='red'){
        this.totalFactionRed++;
      }else this.totalFactionBlue++;
    }
  }
  
  controlloFazione(form: NgForm){
      if(this.totalFactionRed > this.totalFactionBlue + this.totalFactionBlue/10){
        this.register(form, 'blue');
      }else if(this.totalFactionBlue > this.totalFactionRed + this.totalFactionRed/10){
        this.register(form, 'red')
      }else{
        this.register(form);
      }
  }

  ngOnInit(): void {
    this.authService.getAllUser().subscribe({
      next: (res) => {this.totalFaction(res);
       if(this.totalFactionBlue > this.totalFactionRed + this.totalFactionRed/10 || this.totalFactionRed > this.totalFactionBlue + this.totalFactionBlue/10){
          this.flagFactionError=true;
       }
      },
      error: err => console.log(err),
    })
    
    if (this.authService.isAuthenticated()) {
      this.router.navigateByUrl("/");
    }
  }

  register(form: NgForm, fazione?: string) {
    console.log(form.value);
    form.control.markAllAsTouched();
    if (form.valid) {
      this.authService.register(form.value, fazione).subscribe({
        next:(res) => {
          console.log(res);
          this.router.navigateByUrl('/');
        },
      });
    }
  }
}
