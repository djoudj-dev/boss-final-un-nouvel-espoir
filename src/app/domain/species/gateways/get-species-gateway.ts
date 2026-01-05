import { Signal } from '@angular/core';
import { Species } from '../models/species';

export interface GetSpeciesGateway {
  readonly speciesResource: {
    value: Signal<Species[]>;
    isLoading: Signal<boolean>;
    error: Signal<unknown>;
  };
  setUrls(urls: string[]): void;
}

export { GET_SPECIES_GATEWAY } from './get-species-gateway.token';
