import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/@core/services/auth.service';
import { User } from 'src/app/models/user';
import { faker } from '@faker-js/faker';
import { RatingService } from 'src/app/@core/services/rating.service';

@Component({
  selector: 'tnv-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  totaleRecensiti: number= 0;
  currentUser: Partial<User> = {};
  immagineProfilo: string = '';
  cardRedController: boolean=false;
  cardBlueController: boolean= false;

  constructor(private authService: AuthService, private ratingService: RatingService) { }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.immagineProfilo = faker.image.cats();
    this.trovaTotaleRecensiti(this.currentUser.id);
    this.cardColor();
  }

  //funziona per vedere il numero di film recensiti dell'utente corrente
  trovaTotaleRecensiti(userId: number | undefined){
    this.ratingService.getAllRating().subscribe({
      next: res => {
        for( let rating of res){
          if(rating.userId==userId){
            this.totaleRecensiti+=1;
          }
        }
      }
    })
  }

  //funzione che cambia il colore della card a seconda della fazione di una squadra
  cardColor(){
    if(this.currentUser.faction=='red'){
      this.cardRedController=true;
    }
    else{
      this.cardBlueController=true;
    }
  }

}


