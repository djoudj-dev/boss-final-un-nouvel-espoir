import { Observable } from 'rxjs';
import { Homeworld } from '../models/homeworld';

export interface GetHomeworldGateway {
  getHomeworld(url: string): Observable<Homeworld>;
}

export { GET_HOMEWORLD_GATEWAY } from './get-homeworld-gateway.token';
