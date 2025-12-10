import { Observable } from 'rxjs';
import { Film } from '../models/film';

export interface GetFilmGateway {
  getFilm(url: string): Observable<Film>;
}

export { GET_FILM_GATEWAY } from './get-film-gateway.token';
