import { inject, Injectable, computed } from '@angular/core';
import { GET_VEHICLE_GATEWAY } from '../gateways/get-vehicle-gateway.token';
import { Vehicle } from '../models/vehicle';

export interface VehiclesViewModel {
  readonly vehicles: Vehicle[];
  readonly isLoading: boolean;
  readonly error: unknown;
}

@Injectable({ providedIn: 'root' })
export class GetVehiclesUseCase {
  private readonly _gateway = inject(GET_VEHICLE_GATEWAY);

  public readonly viewModel = computed<VehiclesViewModel>(() => ({
    vehicles: this._gateway.vehiclesResource.value(),
    isLoading: this._gateway.vehiclesResource.isLoading(),
    error: this._gateway.vehiclesResource.error(),
  }));

  public setUrls(urls: string[]): void {
    this._gateway.setUrls(urls);
  }
}
