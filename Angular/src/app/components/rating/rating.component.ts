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

  //validator per rendere obbligatori i campi del form
  reviewForm = new FormGroup({
    rating: new FormControl('', Validators.required),
    review: new FormControl('', Validators.required),
  });

  rev: Partial<Review>={};
  rat: Partial<Rating>={};

  movie: Partial<Movie> = {};
  id: string='';
  reviewValues: any;
  counterWord: number=50;

  constructor(private movieService: MovieService, private route: ActivatedRoute, private router: Router, private reviewService: ReviewService, private ratingService: RatingService, private authService: AuthService ) { }

  //recupera il film a seconda dell'id passato nel path
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.movieService.getMovie(parseInt(this.id)).subscribe({
      next: (res: Partial<Movie>) => {this.movie=res},
      error: () => {this.router.navigateByUrl('/game')},
    })
  }

  //counter per far inserire un minimo di 50 parole
  counter(){
    this.reviewValues=Object.entries(this.reviewForm.value).map((x) => x[1]);
    if(this.reviewValues[1].split(" ").filter((x: string) => x !== '').length<=50)
      return this.counterWord - this.reviewValues[1].split(" ").filter((x: string) => x !== '').length;
    else return 0;
  }

  //riempie i campi della review e del rating
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

  //controlla che ci siano almeno 50 parole e nel caso posta il rating e il commento
  onSubmit() {
    if( this.counter() != 0){
      console.log("assicurati di aver dato un voto e aver scritto almeno 50 parole");
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


