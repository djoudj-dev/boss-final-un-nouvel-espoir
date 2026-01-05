import { Component, input, inject, effect, ChangeDetectionStrategy } from '@angular/core';
import { GetStarshipsUseCase } from '../../domain/starships/use-cases/get-starships';
import { SectionHeaderComponent } from '../../shared/ui/section-header';

@Component({
  selector: 'app-starships-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectionHeaderComponent],
  host: {
    class: 'block p-6 rounded-lg bg-background border-2 border-secondary',
  },
  template: `
    @if (viewModel().starships.length > 0) {
      <app-section-header icon="🚀" title="Vaisseaux" />
      <ul class="flex flex-wrap gap-3">
        @for (starship of viewModel().starships; track starship.name) {
        <li class="px-4 py-2 rounded-full bg-secondary/20 border border-secondary text-primary font-semibold hover:bg-secondary/30 transition-colors">
          {{ starship.name }}
        </li>
        }
    </ul>
    }
  `,
})
export class StarshipsListComponent {
  public readonly starshipsUrls = input.required<string[]>();
  private readonly _getStarshipsUseCase = inject(GetStarshipsUseCase);

  private readonly _syncUrlsEffect = effect(() => {
    this._getStarshipsUseCase.setUrls(this.starshipsUrls());
  });

  protected readonly viewModel = this._getStarshipsUseCase.viewModel;
}
