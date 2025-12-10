import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Film } from '../domain/models/film';
import { GetFilmGateway } from '../domain/gateways/get-film-gateway';
import { FilmApi } from './film-api';

@Injectable({ providedIn: 'root' })
export class HttpFilmGateway implements GetFilmGateway {
  private readonly http = inject(HttpClient);

  getFilm(url: string): Observable<Film> {
    return this.http.get<FilmApi>(url).pipe(
      map((api) => ({
        title: api.title,
        releaseDate: api.release_date,
      }))
    );
  }
}
