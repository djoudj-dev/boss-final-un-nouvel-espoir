import { Component, input, inject, effect, signal, ChangeDetectionStrategy } from '@angular/core';
import { GET_STARSHIP_GATEWAY } from '../domain/gateways/get-starship-gateway';
import { Starship } from '../domain/models/starship';

@Component({
  selector: 'app-starships-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    @if (starshipsList() && starshipsList()!.length > 0) {
    <div class="p-6 rounded-lg bg-background border-2 border-secondary">
      <h3 class="text-xl font-bold mb-4 text-secondary flex items-center gap-2">
        <span class="text-2xl">🚀</span> Vaisseaux
      </h3>
      <div class="flex flex-wrap gap-3">
        @for (starship of starshipsList(); track $index) {
        <div
          class="px-4 py-2 rounded-full bg-secondary/20 border border-secondary text-primary font-semibold hover:bg-secondary/30 transition-colors"
        >
          {{ starship.name }}
        </div>
        }
      </div>
    </div>
    }
  `,
})
export class StarshipsListComponent {
  public readonly starshipsUrls = input.required<string[]>();

  private readonly starshipGateway = inject(GET_STARSHIP_GATEWAY);
  protected readonly starshipsList = signal<Starship[] | null>(null);

  constructor() {
    effect(() => {
      const urls = this.starshipsUrls();
      if (!urls || urls.length === 0) {
        this.starshipsList.set(null);
        return;
      }

      Promise.all(urls.map((url) => this.starshipGateway.getStarship(url)))
        .then((starships) => this.starshipsList.set(starships))
        .catch(() => this.starshipsList.set([]));
    });
  }
}
