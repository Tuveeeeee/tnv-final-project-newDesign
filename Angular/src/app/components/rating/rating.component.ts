import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/@core/services/movie.service';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../../models/movie';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReviewService } from 'src/app/@core/services/review.service';
import { RatingService } from 'src/app/@core/services/rating.service';
import { Review } from 'src/app/models/review';
import { Rating } from 'src/app/models/rating';

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

  rev: Partial<Review>={};
  rat: Partial<Rating>={};

  movie: Partial<Movie> = {};
  id: string='';
  reviewValues: any;

  constructor(private movieService: MovieService, private route: ActivatedRoute, private router: Router, private reviewService: ReviewService, private ratingService: RatingService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.movieService.getMovie(parseInt(this.id)).subscribe({
      next: (res: Partial<Movie>) => {this.movie=res},
      error: () => {this.router.navigateByUrl('/game')},
    })
    //this.rat.userId=;
    //this.rev.userId=;
    this.rev.movieId=this.movie.id;
    this.rat.movieId=this.movie.id;
  }

  onSubmit() {
    if(this.reviewForm.valid)
      this.reviewValues = Object.entries(this.reviewForm.value).map((x) => x[1]);
      this.rat.rating=this.reviewValues[0];
      this.rev.review=this.reviewValues[1];

      /*
      this.ratingService.createRating(this.rat).subscribe({
        next: () => {this.router.navigateByUrl('/game')},
        error: () => {console.log("error")},
      });
      */

      //this.reviewService.addReview(this.rev).subscribe({
      //  next: () => {this.router.navigateByUrl('/game')},
      //  error: () => {console.log("error")},
      //});
  }
}
