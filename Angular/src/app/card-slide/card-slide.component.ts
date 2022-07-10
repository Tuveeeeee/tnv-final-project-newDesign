import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../models/movie';

@Component({
  selector: 'tnv-card-slide',
  templateUrl: './card-slide.component.html',
  styleUrls: ['./card-slide.component.scss']
})
export class CardSlideComponent implements OnInit {
  @Input() movie: Partial<Movie> = {};

  constructor() { }

  ngOnInit(): void {
  }

}
