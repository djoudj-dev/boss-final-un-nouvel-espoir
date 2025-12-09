import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Vehicle } from '../domain/models/vehicle';
import { GetVehicleGateway } from '../domain/gateways/get-vehicle-gateway';
import { VehicleApi } from './vehicle-api';

@Injectable({ providedIn: 'root' })
export class HttpVehicleGateway implements GetVehicleGateway {
  private readonly http = inject(HttpClient);

  getVehicle$(url: string): Observable<Vehicle> {
    return this.http.get<VehicleApi>(url).pipe(
      map((api) => ({
        name: api.name,
        model: api.model,
      }))
    );
  }
}
