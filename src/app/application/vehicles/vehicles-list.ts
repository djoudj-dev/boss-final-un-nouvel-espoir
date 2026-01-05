import { Component, input, inject, effect, ChangeDetectionStrategy } from '@angular/core';
import { GetVehiclesUseCase } from '../../domain/vehicles/use-cases/get-vehicles';
import { SectionHeaderComponent } from '../../shared/ui/section-header';

@Component({
  selector: 'app-vehicles-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectionHeaderComponent],
  host: {
    class: 'block mb-6 p-6 rounded-lg bg-background border-2 border-secondary',
  },
  template: `
    @if (viewModel().vehicles.length > 0) {
      <app-section-header icon="🚗" title="Véhicules" />
      <ul class="flex flex-wrap gap-3">
        @for (vehicle of viewModel().vehicles; track vehicle.name) {
        <li class="px-4 py-2 rounded-full bg-secondary/20 border border-secondary text-primary font-semibold hover:bg-secondary/30 transition-colors">
          {{ vehicle.name }}
        </li>
        }
    </ul>
    }
  `,
})
export class VehiclesListComponent {
  public readonly vehiclesUrls = input.required<string[]>();
  private readonly _getVehiclesUseCase = inject(GetVehiclesUseCase);

  private readonly _syncUrlsEffect = effect(() => {
    this._getVehiclesUseCase.setUrls(this.vehiclesUrls());
  });

  protected readonly viewModel = this._getVehiclesUseCase.viewModel;
}
