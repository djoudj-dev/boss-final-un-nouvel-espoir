import { Component, input, inject, ChangeDetectionStrategy } from '@angular/core';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { switchMap, of, forkJoin, catchError } from 'rxjs';
import { GET_VEHICLE_GATEWAY } from '../domain/gateways/get-vehicle-gateway';

@Component({
  selector: 'app-vehicles-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    @if (vehiclesList() && vehiclesList()!.length > 0) {
    <div class="mb-6 p-6 rounded-lg bg-background border-2 border-secondary">
      <h3 class="text-xl font-bold mb-4 text-secondary flex items-center gap-2">
        <span class="text-2xl">🚗</span> Véhicules
      </h3>
      <div class="flex flex-wrap gap-3">
        @for (vehicle of vehiclesList(); track $index) {
        <div
          class="px-4 py-2 rounded-full bg-secondary/20 border border-secondary text-primary font-semibold hover:bg-secondary/30 transition-colors"
        >
          {{ vehicle.name }}
        </div>
        }
      </div>
    </div>
    }
  `,
})
export class VehiclesListComponent {
  public readonly vehiclesUrls = input.required<string[]>();

  private readonly vehicleGateway = inject(GET_VEHICLE_GATEWAY);

  protected readonly vehiclesList = toSignal(
    toObservable(this.vehiclesUrls).pipe(
      switchMap((urls) => {
        if (!urls || urls.length === 0) {
          return of(null);
        }
        return forkJoin(
          urls.map((url) => this.vehicleGateway.getVehicle$(url))
        ).pipe(
          catchError(() => of([]))
        );
      })
    ),
    { initialValue: null }
  );
}
