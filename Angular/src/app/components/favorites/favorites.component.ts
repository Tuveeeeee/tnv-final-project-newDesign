import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/@core/services/movie.service';
import { AuthService } from 'src/app/@core/services/auth.service';
import { RatingService } from 'src/app/@core/services/rating.service';
import { Rating } from 'src/app/models/rating';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { Movie } from 'src/app/models/movie';
import { FactionMovies } from 'src/app/models/movie';
import { switchMap } from 'rxjs';


@Component({
  selector: 'tnv-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})

export class FavoritesComponent implements OnInit {

  user:Partial<User>={};
  ratings: Rating[]=[];
  factionMovies: Partial<FactionMovies>={red: [], blue: []};
  movies: Partial<Movie>[]=[];
  
  constructor(private movieService: MovieService, private authService: AuthService, private ratingService: RatingService, private router: Router) { }

  getMovies(ratings: Rating[]){
    for(let rating of ratings){
      this.authService.getUserById(rating.userId).subscribe({
        next: user => {
          this.movieService.getMovie(rating.movieId).subscribe({
            next: (res: Partial<Movie>) => {
              console.log(user.faction);
              if(user.faction =='red'){
                this.factionMovies.red?.push(res);
              }else{
                this.factionMovies.blue?.push(res);
              }
  
          },
            error: () => {this.router.navigateByUrl('/welcome')},
          })}
        })        
    }
  }

  ngOnInit(): void {
    this.ratingService.getAllRating().subscribe({
      next: res =>{ this.getMovies(res)},
      error: () => this.router.navigateByUrl('/welcome')
    })
  }
}

