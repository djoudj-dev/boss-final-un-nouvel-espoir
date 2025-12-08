import { Component, input, inject, effect, signal, ChangeDetectionStrategy } from '@angular/core';
import { GET_VEHICLE_GATEWAY } from '../domain/gateways/get-vehicle-gateway';
import { Vehicle } from '../domain/models/vehicle';

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
  protected readonly vehiclesList = signal<Vehicle[] | null>(null);

  constructor() {
    effect(() => {
      const urls = this.vehiclesUrls();
      if (!urls || urls.length === 0) {
        this.vehiclesList.set(null);
        return;
      }

      Promise.all(urls.map((url) => this.vehicleGateway.getVehicle(url)))
        .then((vehicles) => this.vehiclesList.set(vehicles))
        .catch(() => this.vehiclesList.set([]));
    });
  }
}
