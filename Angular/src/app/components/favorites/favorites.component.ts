import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/@core/services/movie.service';
import { AuthService } from 'src/app/@core/services/auth.service';
import { RatingService } from 'src/app/@core/services/rating.service';
import { Rating } from 'src/app/models/rating';
import { Router } from '@angular/router';
import { Movie } from 'src/app/models/movie';


@Component({
  selector: 'tnv-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  ratings: Rating[]=[];
  movies: Partial<Movie>[]=[];

  constructor(private movieService: MovieService, private authService: AuthService, private ratingService: RatingService, private router: Router) { }


  getMovies(ratings: Rating[]){
    for(let rating of ratings){
      this.movieService.getMovie(rating.movieId).subscribe({
        next: (res: Partial<Movie>) => {this.movies.push(res)},
        error: () => {this.router.navigateByUrl('/welcome')},
      })
    }
  }

  ngOnInit(): void {
    this.ratingService.getAllRating().subscribe({
      next: res =>{ this.getMovies(res) },
      error: () => this.router.navigateByUrl('/welcome')
    })
  }
}

