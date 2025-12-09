import { Component, input, inject, ChangeDetectionStrategy } from '@angular/core';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { switchMap, of, catchError } from 'rxjs';
import { GET_HOMEWORLD_GATEWAY } from '../domain/gateways/get-homeworld-gateway';

@Component({
  selector: 'app-homeworld-display',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    @if (homeworld()) {
    <div class="p-6 rounded-lg bg-background border-2 border-secondary">
      <h3 class="text-xl font-bold mb-4 text-secondary flex items-center gap-2">
        <span class="text-2xl">🌍</span> Planète d'origine
      </h3>
      <div class="space-y-3">
        <div class="py-2 border-b border-secondary/30">
          <span class="text-gray-400 block mb-1">Nom</span>
          <span class="font-bold text-primary text-lg">{{ homeworld()!.name }}</span>
        </div>
        <div class="py-2">
          <span class="text-gray-400 block mb-1">Population</span>
          <span class="font-bold text-primary text-lg">{{ homeworld()!.population }}</span>
        </div>
      </div>
    </div>
    }
  `,
})
export class HomeworldDisplayComponent {
  public readonly homeworldUrl = input.required<string>();

  private readonly homeworldGateway = inject(GET_HOMEWORLD_GATEWAY);

  protected readonly homeworld = toSignal(
    toObservable(this.homeworldUrl).pipe(
      switchMap((url) => {
        if (!url) {
          return of(null);
        }
        return this.homeworldGateway.getHomeworld$(url).pipe(
          catchError(() => of(null))
        );
      })
    ),
    { initialValue: null }
  );
}
