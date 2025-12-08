import { Species } from '../models/species';

export interface GetSpeciesGateway {
  getSpecies(url: string): Promise<Species>;
}

export { GET_SPECIES_GATEWAY } from './get-species-gateway.token';
