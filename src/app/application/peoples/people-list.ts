import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { People } from '../../domain/peoples/models/people';
import { DefinitionItemComponent } from '../../shared/ui/definition-item';

@Component({
  selector: 'app-people-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DefinitionItemComponent],
  host: {
    class: 'container mx-auto px-4 py-8 block',
  },
  template: `
    <h2 class="text-3xl font-bold mb-6 text-center text-primary">Personnages Star Wars</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      @for (person of people(); track person.id) {
      <article
        class="card-sw cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl"
        (click)="personSelected.emit(person)"
      >
          <header class="mb-4">
            <h3 class="text-2xl font-bold text-primary mb-2">{{ person.name }}</h3>
            <div class="h-1 w-16 bg-secondary rounded"></div>
          </header>

          <dl class="space-y-3">
            <app-definition-item label="Taille" [value]="person.height + ' cm'" />
            <app-definition-item label="Poids" [value]="person.mass + ' kg'" />
            <app-definition-item label="Naissance" [value]="person.birthYear" />
            <app-definition-item label="Genre" [value]="person.gender" />
            @if (person.eyeColor && person.eyeColor !== 'n/a') {
            <app-definition-item label="Yeux" [value]="person.eyeColor" />
            }
          </dl>

          <footer class="mt-6">
            <button class="button-sw w-full">Voir les détails</button>
          </footer>
      </article>
      }
    </div>
  `,
})
export class PeopleListComponent {
  public readonly people = input<People[]>();
  public readonly personSelected = output<People>();
}
