import { Component, input, inject, ChangeDetectionStrategy } from '@angular/core';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { switchMap, of, forkJoin, catchError } from 'rxjs';
import { GET_STARSHIP_GATEWAY } from '../domain/gateways/get-starship-gateway';

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

  protected readonly starshipsList = toSignal(
    toObservable(this.starshipsUrls).pipe(
      switchMap((urls) => {
        if (!urls || urls.length === 0) {
          return of(null);
        }
        return forkJoin(
          urls.map((url) => this.starshipGateway.getStarship$(url))
        ).pipe(
          catchError(() => of([]))
        );
      })
    ),
    { initialValue: null }
  );
}
