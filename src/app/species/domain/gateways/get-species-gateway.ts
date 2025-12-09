import { Observable } from 'rxjs';
import { Species } from '../models/species';

export interface GetSpeciesGateway {
  getSpecies$(url: string): Observable<Species>;
}

export { GET_SPECIES_GATEWAY } from './get-species-gateway.token';
