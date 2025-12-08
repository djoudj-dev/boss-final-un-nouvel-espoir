import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Film } from '../domain/models/film';
import { GetFilmGateway } from '../domain/gateways/get-film-gateway';
import { FilmApi } from './film-api';

@Injectable({ providedIn: 'root' })
export class HttpFilmGateway implements GetFilmGateway {
  private readonly http = inject(HttpClient);

  async getFilm(url: string): Promise<Film> {
    const api = await firstValueFrom(this.http.get<FilmApi>(url));
    return {
      title: api.title,
      releaseDate: api.release_date,
    };
  }
}
