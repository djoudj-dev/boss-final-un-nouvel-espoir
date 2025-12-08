import { InjectionToken } from '@angular/core';
import { GetFilmGateway } from './get-film-gateway';

export const GET_FILM_GATEWAY = new InjectionToken<GetFilmGateway>(
  'GET_FILM_GATEWAY'
);
