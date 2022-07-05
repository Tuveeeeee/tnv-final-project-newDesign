import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/@core/services/movie.service';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../../models/movie';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReviewService } from 'src/app/@core/services/review.service';
import { RatingService } from '../../@core/services/rating.service';

@Component({
  selector: 'tnv-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

  reviewForm = new FormGroup({
    rating: new FormControl('', Validators.required),
    review: new FormControl('', [Validators.minLength(50), Validators.required]),
  });

  movie: Partial<Movie> = {};
  id: string='';
  reviewValues: any;

  constructor(private movieService: MovieService, private route: ActivatedRoute, private router: Router, private reviewService: ReviewService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.movieService.getMovie(parseInt(this.id)).subscribe({
      next: (res: Partial<Movie>) => {this.movie=res},
      error: () => {this.router.navigateByUrl('/game')},
    })
  }

  onSubmit() {
    if(this.reviewForm.valid)
      this.reviewValues = Object.entries(this.reviewForm.value).map((x) => x[1]);

      /*
      this.reviewService.addRating(this.reviewValues[0]).subscribe({
        next: () => {this.router.navigateByUrl('/game')},
        error: () => {console.log("error")},
      });
      */

      this.reviewService.addReview(this.reviewValues[1]).subscribe({
        next: () => {this.router.navigateByUrl('/game')},
        error: () => {console.log("error")},
      });
  }
}
