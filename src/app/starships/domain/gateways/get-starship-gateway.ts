import { Starship } from '../models/starship';

export interface GetStarshipGateway {
  getStarship(url: string): Promise<Starship>;
}

export { GET_STARSHIP_GATEWAY } from './get-starship-gateway.token';
