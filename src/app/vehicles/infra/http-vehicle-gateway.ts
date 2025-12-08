import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Vehicle } from '../domain/models/vehicle';
import { GetVehicleGateway } from '../domain/gateways/get-vehicle-gateway';
import { VehicleApi } from './vehicle-api';

@Injectable({ providedIn: 'root' })
export class HttpVehicleGateway implements GetVehicleGateway {
  private readonly http = inject(HttpClient);

  async getVehicle(url: string): Promise<Vehicle> {
    const api = await firstValueFrom(this.http.get<VehicleApi>(url));
    return {
      name: api.name,
      model: api.model,
    };
  }
}
