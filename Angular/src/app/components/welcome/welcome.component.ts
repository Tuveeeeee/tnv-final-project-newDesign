import { AuthService } from './../../@core/services/auth.service';
import { User } from './../../models/user';
import { Component, OnInit } from '@angular/core';
import { faker } from '@faker-js/faker';
import { RegisterDTO } from './../../models/user';


@Component({
  selector: 'tnv-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  user:Partial<RegisterDTO>={};

  constructor(private authService: AuthService) { }

  generaUtenti(faction: string){
    for(let index=0;index<100;index++){
      this.user.faction=faction;
      this.user.name=faker.name.firstName();
      this.user.surname=faker.name.lastName();;
      this.user.username=faker.internet.userName();
      this.user.password=faker.internet.password();
      this.authService.register(this.user).subscribe({
        next: res => console.log(index),
        error: err => console.log('error'),
      });
    }

  }
  ngOnInit(): void {
    //this.generaUtenti('red');
    //this.generaUtenti('blue');
  }
}



