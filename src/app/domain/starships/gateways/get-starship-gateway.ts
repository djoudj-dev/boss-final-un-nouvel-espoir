import { Signal } from '@angular/core';
import { Starship } from '../models/starship';

export interface GetStarshipGateway {
  readonly starshipsResource: {
    value: Signal<Starship[]>;
    isLoading: Signal<boolean>;
    error: Signal<unknown>;
  };
  setUrls(urls: string[]): void;
}

export { GET_STARSHIP_GATEWAY } from './get-starship-gateway.token';
