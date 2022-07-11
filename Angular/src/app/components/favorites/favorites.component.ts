import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/@core/services/movie.service';
import { AuthService } from 'src/app/@core/services/auth.service';
import { RatingService } from 'src/app/@core/services/rating.service';
import { Rating } from 'src/app/models/rating';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { Movie } from 'src/app/models/movie';
import { switchMap } from 'rxjs';


@Component({
  selector: 'tnv-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})

export class FavoritesComponent implements OnInit {

  indexMovie: number=0;
  movie: Partial<Movie>={};
  user:Partial<User>={};
  ratings: Rating[]=[];
  movies: Partial<Movie>[]=[];
  
  
  constructor(private movieService: MovieService, private authService: AuthService, private ratingService: RatingService, private router: Router) { }

  getMovies(ratings: Rating[]){
    for(let rating of ratings){
      this.authService.getUserById(rating.userId).subscribe({
        next: user => {
          this.movieService.getMovie(rating.movieId).subscribe({
            next: (res: Partial<Movie>) => {
                this.movies.push(res);
                if(this.authService.getCurrentUser().faction != user.faction){
                  this.movies.pop();
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
     // error: () => this.router.navigateByUrl('/welcome')
    })
  }



  cambiaMovie(index: number){
    if(index-1 == this.movies.length){
      this.indexMovie=0;
    }
    else{
      this.indexMovie++;
    }
  }
}



