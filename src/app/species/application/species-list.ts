import { Component, input, inject, ChangeDetectionStrategy } from '@angular/core';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { switchMap, of, forkJoin, catchError } from 'rxjs';
import { GET_SPECIES_GATEWAY } from '../domain/gateways/get-species-gateway';

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
        @for (species of speciesList(); track species.name) {
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

  protected readonly speciesList = toSignal(
    toObservable(this.speciesUrls).pipe(
      switchMap((urls) => {
        if (!urls || urls.length === 0) {
          return of(null);
        }
        return forkJoin(
          urls.map((url) => this.speciesGateway.getSpecies(url))
        ).pipe(
          catchError(() => of([]))
        );
      })
    ),
    { initialValue: null }
  );
}
