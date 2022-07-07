import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movie } from 'src/app/models/movie';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class MovieService {

  movies: Partial<Movie>[] = [];

  constructor(private httpClient: HttpClient, private router: Router) { }

  private api_key: string='438f25e60ab0a1dbcfb9de7aa0a37d13';

  getMovie(movieId: number | undefined){
    return this.httpClient.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${this.api_key}`);
  }

  getRandomMovies(index: number) {
    // Per determinare questo valore facciamo eventualmente una query su movies/latest per avere l'id dell'ultimo Film inserito su TMDB
    const latestId = 30000;
    const randomId = Math.round(Math.random() * latestId);

    this.httpClient
      .get(
        `https://api.themoviedb.org/3/movie/${randomId}?api_key=${this.api_key}`
      )
      .subscribe({
        // Qui non usate any ovviamente, ma create l'interfaccia typescript per la response
        next: (res: Partial<Movie>) => {
          console.log('ID trovato', randomId);
          if (res.poster_path) {
            this.movies[index] = res;
          } else {
            console.log('Film senza poster');
            this.getRandomMovies(index);
          }
        },
        error: () => {
          console.log('ID non esistente, retry!', randomId);
          this.getRandomMovies(index);
        },
      });
    }
}
