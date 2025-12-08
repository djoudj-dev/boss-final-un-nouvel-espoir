import { Component, input, inject, effect, signal, ChangeDetectionStrategy } from '@angular/core';
import { GET_FILM_GATEWAY } from '../domain/gateways/get-film-gateway.token';
import { Film } from '../domain/models/film';

@Component({
  selector: 'app-films-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    @if (filmsList() && filmsList()!.length > 0) {
    <div class="mb-6 p-6 rounded-lg bg-background border-2 border-secondary">
      <h3 class="text-xl font-bold mb-4 text-secondary flex items-center gap-2">
        <span class="text-2xl">🎬</span> Films
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        @for (film of filmsList(); track $index) {
        <div
          class="p-4 rounded bg-secondary/10 border border-secondary/50 hover:bg-secondary/20 transition-colors"
        >
          <div class="font-bold text-primary">{{ film.title }}</div>
          <div class="text-sm text-gray-400">{{ film.releaseDate }}</div>
        </div>
        }
      </div>
    </div>
    }
  `,
})
export class FilmsListComponent {
  public readonly filmsUrls = input.required<string[]>();

  private readonly filmGateway = inject(GET_FILM_GATEWAY);
  protected readonly filmsList = signal<Film[] | null>(null);

  constructor() {
    effect(() => {
      const urls = this.filmsUrls();
      if (!urls || urls.length === 0) {
        this.filmsList.set(null);
        return;
      }

      Promise.all(urls.map((url) => this.filmGateway.getFilm(url)))
        .then((films) => this.filmsList.set(films))
        .catch(() => this.filmsList.set([]));
    });
  }
}
