import { Observable } from 'rxjs';
import { Vehicle } from '../models/vehicle';

export interface GetVehicleGateway {
  getVehicle$(url: string): Observable<Vehicle>;
}

export { GET_VEHICLE_GATEWAY } from './get-vehicle-gateway.token';
