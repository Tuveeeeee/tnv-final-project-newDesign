import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Review } from 'src/app/models/review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  dotnetBaseUrl : string ="https://localhost:5203/api/comments"

  constructor(private httpClient: HttpClient) { }

  addReview(review: Partial<Review>){
    return this.httpClient.patch<Review>("https://localhost:5203/api/comments", review);
  }
}
