import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/@core/services/movie.service';
import { AuthService } from 'src/app/@core/services/auth.service';
import { RatingService } from 'src/app/@core/services/rating.service';
import { Rating } from 'src/app/models/rating';
import 


@Component({
  selector: 'tnv-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  ratings: Rating[]=[];

  constructor(private movieService: MovieService, private authService: AuthService, private ratingService: RatingService) { }


  ngOnInit(): void {
    this.ratingService.getAllRating().subscribe({
      next: res =>{ this.ratings=res },
      error: 
    })
    
  }

}
