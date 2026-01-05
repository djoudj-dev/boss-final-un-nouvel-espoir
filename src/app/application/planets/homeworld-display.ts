import { Component, input, inject, effect, ChangeDetectionStrategy } from '@angular/core';
import { GetHomeworldUseCase } from '../../domain/planets/use-cases/get-homeworld';
import { SectionHeaderComponent } from '../../shared/ui/section-header';
import { DefinitionItemComponent } from '../../shared/ui/definition-item';

@Component({
  selector: 'app-homeworld-display',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectionHeaderComponent, DefinitionItemComponent],
  host: {
    class: 'block p-6 rounded-lg bg-background border-2 border-secondary',
  },
  template: `
    @if (viewModel().homeworld) {
      <app-section-header icon="🌍" title="Planète d'origine" />
      <dl class="space-y-3">
        <app-definition-item label="Nom" [value]="viewModel().homeworld!.name" size="large" variant="vertical" />
        <app-definition-item label="Population" [value]="viewModel().homeworld!.population" size="large" variant="vertical" />
      </dl>
    }
  `,
})
export class HomeworldDisplayComponent {
  public readonly homeworldUrl = input.required<string>();
  private readonly _getHomeworldUseCase = inject(GetHomeworldUseCase);

  private readonly _syncUrlEffect = effect(() => {
    this._getHomeworldUseCase.setUrl(this.homeworldUrl());
  });

  protected readonly viewModel = this._getHomeworldUseCase.viewModel;
}
