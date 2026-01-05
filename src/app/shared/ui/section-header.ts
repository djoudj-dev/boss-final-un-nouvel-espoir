import { Component, input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-section-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <h2 class="text-xl font-bold mb-4 text-secondary flex items-center gap-2">
      <span class="text-2xl" aria-hidden="true">{{ icon() }}</span> {{ title() }}
    </h2>
  `,
})
export class SectionHeaderComponent {
  public readonly icon = input.required<string>();
  public readonly title = input.required<string>();
}
