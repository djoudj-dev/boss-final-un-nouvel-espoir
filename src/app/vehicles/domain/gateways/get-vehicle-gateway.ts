import { Vehicle } from '../models/vehicle';

export interface GetVehicleGateway {
  getVehicle(url: string): Promise<Vehicle>;
}

export { GET_VEHICLE_GATEWAY } from './get-vehicle-gateway.token';
