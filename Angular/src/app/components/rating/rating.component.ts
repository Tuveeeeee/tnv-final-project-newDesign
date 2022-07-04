import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/@core/services/movie.service';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../../models/movie';
import { Router } from '@angular/router';
import { NgForm } from "@angular/forms";


@Component({
  selector: 'tnv-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

  movie: Partial<Movie> = {};
  id: string='';
  starRating: number = 0;

  constructor(private movieService: MovieService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.movieService.getMovie(parseInt(this.id)).subscribe({
      next: (res: Partial<Movie>) => {this.movie=res},
      error: () => {this.router.navigateByUrl('/game')},
    })
  }
}
