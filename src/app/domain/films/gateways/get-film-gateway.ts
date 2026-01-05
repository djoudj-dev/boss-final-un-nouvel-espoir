import { Signal } from '@angular/core';
import { Film } from '../models/film';

export interface GetFilmGateway {
  readonly filmsResource: {
    value: Signal<Film[]>;
    isLoading: Signal<boolean>;
    error: Signal<unknown>;
  };
  setUrls(urls: string[]): void;
}

export { GET_FILM_GATEWAY } from './get-film-gateway.token';
