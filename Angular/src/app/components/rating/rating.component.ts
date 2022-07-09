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
import { AuthService } from 'src/app/@core/services/auth.service';

@Component({
  selector: 'tnv-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

  reviewForm = new FormGroup({
    rating: new FormControl('', Validators.required),
    review: new FormControl('', Validators.required),
  });

  rev: Partial<Review>={};
  rat: Partial<Rating>={};

  movie: Partial<Movie> = {};
  id: string='';
  reviewValues: any;
  flagErroreMinWord: boolean=false;
  counterWord: number=50;

  constructor(private movieService: MovieService, private route: ActivatedRoute, private router: Router, private reviewService: ReviewService, private ratingService: RatingService, private authService: AuthService ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.movieService.getMovie(parseInt(this.id)).subscribe({
      next: (res: Partial<Movie>) => {this.movie=res},
      error: () => {this.router.navigateByUrl('/game')},
    })
    //this.rat.userId=;
    //this.rev.userId=;
  }

  counter(){
    this.reviewValues=Object.entries(this.reviewForm.value).map((x) => x[1]);
    if(this.reviewValues[1].split(" ").filter((x: string) => x !== '').length<=50)
      return this.counterWord - this.reviewValues[1].split(" ").filter((x: string) => x !== '').length;
    else return 0;
  }


  inizializzaReview(){
    if(this.reviewForm.valid)
    this.reviewValues = Object.entries(this.reviewForm.value).map((x) => x[1]);
    this.rat.rating=this.reviewValues[0];
    this.rev.comment=this.reviewValues[1];
    this.rev.movie_Id=this.movie.id;
    this.rat.movieId=this.movie.id;
    this.rat.userId=(Object.entries(this.authService.getCurrentUser()).map(x => x[1])[0]);
    this.rev.user_Id=(Object.entries(this.authService.getCurrentUser()).map(x => x[1])[0]);
  }

  onSubmit() {
    if( this.counter() != 0){
      this.flagErroreMinWord=true;
    }else{   
      this.inizializzaReview();
       
      this.ratingService.createRating(this.rat).subscribe({
          next: () => {this.router.navigateByUrl('/game')},
          error: (err) => {console.log(err)},
      });
        
      this.reviewService.addReview(this.rev).subscribe({
          next: () => {this.router.navigateByUrl('/game')},
          error: (err) => {console.log(err)},
      });
    }
  }
}


