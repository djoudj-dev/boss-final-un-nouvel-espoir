import { Film } from '../models/film';

export interface GetFilmGateway {
  getFilm(url: string): Promise<Film>;
}

export { GET_FILM_GATEWAY } from './get-film-gateway.token';
