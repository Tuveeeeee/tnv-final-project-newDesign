import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/@core/services/movie.service';

@Component({
  selector: 'tnv-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  constructor(private movieService: MovieService) {}

  movies = this.movieService.movies;

  ngOnInit(): void {
    if(this.movies.length==0){
      this.randMovie();
    }
  }

  randMovie(){
    for(let index= 0; index < 4; index++)
      this.movieService.getRandomMovies(index);
  }
}