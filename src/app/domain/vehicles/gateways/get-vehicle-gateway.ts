import { Signal } from '@angular/core';
import { Vehicle } from '../models/vehicle';

export interface GetVehicleGateway {
  readonly vehiclesResource: {
    value: Signal<Vehicle[]>;
    isLoading: Signal<boolean>;
    error: Signal<unknown>;
  };
  setUrls(urls: string[]): void;
}
