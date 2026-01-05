import { Component, input, ChangeDetectionStrategy, computed } from '@angular/core';

@Component({
  selector: 'app-definition-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  host: {
    '[class]': 'hostClass()',
  },
  template: `
    <dt [class]="labelClass()">{{ label() }}</dt>
    <dd [class]="valueClass()">{{ value() }}</dd>
  `,
})
export class DefinitionItemComponent {
  public readonly label = input.required<string>();
  public readonly value = input.required<string | number>();
  public readonly size = input<'small' | 'large'>('small');
  public readonly variant = input<'horizontal' | 'vertical'>('horizontal');

  protected readonly hostClass = computed(() => {
    const base = 'py-2 border-b border-secondary/30';
    return this.variant() === 'horizontal'
      ? `${base} flex justify-between items-center`
      : base;
  });

  protected readonly labelClass = computed(() => {
    const base = 'text-gray-400';
    const size = this.size() === 'small' ? 'text-sm' : '';
    const variant = this.variant() === 'vertical' ? 'block mb-1' : '';
    return `${base} ${size} ${variant}`.trim();
  });

  protected readonly valueClass = computed(() => {
    const base = 'text-primary';
    const weight = this.size() === 'large' ? 'font-bold' : 'font-semibold';
    const size = this.size() === 'large' ? 'text-lg' : '';
    return `${base} ${weight} ${size}`.trim();
  });
}
