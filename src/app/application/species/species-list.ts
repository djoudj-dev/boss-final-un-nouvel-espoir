import { Component, input, inject, effect, ChangeDetectionStrategy } from '@angular/core';
import { GetSpeciesUseCase } from '../../domain/species/use-cases/get-species';
import { SectionHeaderComponent } from '../../shared/ui/section-header';

@Component({
  selector: 'app-species-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectionHeaderComponent],
  host: {
    class: 'block p-6 rounded-lg bg-background border-2 border-secondary',
  },
  template: `
    @if (viewModel().species.length > 0) {
      <app-section-header icon="🧬" title="Espèce" />
      <ul class="space-y-2">
        @for (species of viewModel().species; track species.name) {
        <li class="p-3 rounded bg-secondary/20 border border-secondary">
          <p class="font-bold text-primary">{{ species.name }}</p>
          <p class="text-sm text-gray-400">Langue: {{ species.language }}</p>
        </li>
        }
    </ul>
    }
  `,
})
export class SpeciesListComponent {
  public readonly speciesUrls = input.required<string[]>();
  private readonly _getSpeciesUseCase = inject(GetSpeciesUseCase);

  private readonly _syncUrlsEffect = effect(() => {
    this._getSpeciesUseCase.setUrls(this.speciesUrls());
  });

  protected readonly viewModel = this._getSpeciesUseCase.viewModel;
}
