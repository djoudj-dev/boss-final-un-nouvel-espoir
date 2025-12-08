import { Homeworld } from '../models/homeworld';

export interface GetHomeworldGateway {
  getHomeworld(url: string): Promise<Homeworld>;
}

export { GET_HOMEWORLD_GATEWAY } from './get-homeworld-gateway.token';
