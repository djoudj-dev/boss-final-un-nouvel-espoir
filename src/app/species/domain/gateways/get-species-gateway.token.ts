import { InjectionToken } from '@angular/core';
import { GetSpeciesGateway } from './get-species-gateway';

export const GET_SPECIES_GATEWAY = new InjectionToken<GetSpeciesGateway>(
  'GET_SPECIES_GATEWAY'
);
