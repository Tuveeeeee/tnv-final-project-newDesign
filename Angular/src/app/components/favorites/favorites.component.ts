import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/@core/services/movie.service';
import { AuthService } from 'src/app/@core/services/auth.service';


@Component({
  selector: 'tnv-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {


  constructor(private movieService: MovieService, private authService: AuthService) { }

  ngOnInit(): void {
    
  }

}
