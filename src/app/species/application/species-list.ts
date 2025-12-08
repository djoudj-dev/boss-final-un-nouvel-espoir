import { Component, input, inject, effect, signal, ChangeDetectionStrategy } from '@angular/core';
import { GET_SPECIES_GATEWAY } from '../domain/gateways/get-species-gateway';
import { Species } from '../domain/models/species';

@Component({
  selector: 'app-species-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    @if (speciesList() && speciesList()!.length > 0) {
    <div class="p-6 rounded-lg bg-background border-2 border-secondary">
      <h3 class="text-xl font-bold mb-4 text-secondary flex items-center gap-2">
        <span class="text-2xl">🧬</span> Espèce
      </h3>
      <div class="space-y-2">
        @for (species of speciesList(); track $index) {
        <div class="p-3 rounded bg-secondary/20 border border-secondary">
          <div class="font-bold text-primary">{{ species.name }}</div>
          <div class="text-sm text-gray-400">Langue: {{ species.language }}</div>
        </div>
        }
      </div>
    </div>
    }
  `,
})
export class SpeciesListComponent {
  public readonly speciesUrls = input.required<string[]>();

  private readonly speciesGateway = inject(GET_SPECIES_GATEWAY);
  protected readonly speciesList = signal<Species[] | null>(null);

  constructor() {
    effect(() => {
      const urls = this.speciesUrls();
      if (!urls || urls.length === 0) {
        this.speciesList.set(null);
        return;
      }

      Promise.all(urls.map((url) => this.speciesGateway.getSpecies(url)))
        .then((species) => this.speciesList.set(species))
        .catch(() => this.speciesList.set([]));
    });
  }
}
