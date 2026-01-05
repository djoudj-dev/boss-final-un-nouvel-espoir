import {Component, input, inject, effect, ChangeDetectionStrategy, computed} from '@angular/core';
import { GetFilmsUseCase } from '../../domain/films/use-cases/get-films';
import { SectionHeaderComponent } from '../../shared/ui/section-header';

@Component({
  selector: 'app-films-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectionHeaderComponent],
  host: {
    class: 'block mb-6 p-6 rounded-lg bg-background border-2 border-secondary',
  },
  template: `
    @if (viewModel().films.length > 0) {
      <app-section-header icon="🎬" title="Films" />
      <ul class="grid grid-cols-1 md:grid-cols-2 gap-3">
        @for (film of viewModel().films; track film.title) {
        <li class="p-4 rounded bg-secondary/10 border border-secondary/50 hover:bg-secondary/20 transition-colors">
          <p class="font-bold text-primary">{{ film.title }}</p>
          <time class="text-sm text-gray-400">{{ film.releaseDate }}</time>
        </li>
        }
    </ul>
    }
  `,
})
export class FilmsListComponent {
  public readonly filmsUrls = input.required<string[]>();
  private readonly _getFilmsUseCase = inject(GetFilmsUseCase);

  protected readonly viewModel = computed(() => {
    this._getFilmsUseCase.setUrls(this.filmsUrls());
    return this._getFilmsUseCase.viewModel();
  });
}
