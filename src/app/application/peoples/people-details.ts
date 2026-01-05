import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { DatePipe } from '@angular/common';
import { People } from '../../domain/peoples/models/people';
import { HomeworldDisplayComponent } from '../planets/homeworld-display';
import { SpeciesListComponent } from '../species/species-list';
import { VehiclesListComponent } from '../vehicles/vehicles-list';
import { StarshipsListComponent } from '../starships/starships-list';
import { SectionHeaderComponent } from '../../shared/ui/section-header';
import { DefinitionItemComponent } from '../../shared/ui/definition-item';

@Component({
  selector: 'app-people-details',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DatePipe,
    HomeworldDisplayComponent,
    SpeciesListComponent,
    VehiclesListComponent,
    StarshipsListComponent,
    SectionHeaderComponent,
    DefinitionItemComponent,
  ],
  host: {
    class: 'container mx-auto px-4 py-8 block',
  },
  template: `
      <nav class="mb-6">
        <button class="button-sw" (click)="back.emit()">Retour à la liste</button>
      </nav>
      @let p = person();
      <article class="card-sw max-w-5xl mx-auto">
        <header class="text-center mb-8">
          <h1 class="text-5xl font-bold text-primary mb-2">{{ p.name }}</h1>
          <div class="h-1 w-24 bg-secondary rounded mx-auto"></div>
        </header>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <section class="p-6 rounded-lg bg-background border-2 border-secondary">
            <app-section-header icon="👤" title="Caractéristiques" />
            <dl class="space-y-3">
              <app-definition-item label="Taille" [value]="p.height + ' cm'" size="large" />
              <app-definition-item label="Poids" [value]="p.mass + ' kg'" size="large" />
              <app-definition-item label="Année de naissance" [value]="p.birthYear" size="large" />
              <app-definition-item label="Genre" [value]="p.gender" size="large" />
            </dl>
          </section>

          <section class="p-6 rounded-lg bg-background border-2 border-secondary">
            <app-section-header icon="✨" title="Apparence" />
            <dl class="space-y-3">
              @if (p.hairColors.length > 0) {
              <app-definition-item label="Cheveux" [value]="p.hairColors.join(', ')" variant="vertical" />
              }
              @if (p.skinColors.length > 0) {
              <app-definition-item label="Peau" [value]="p.skinColors.join(', ')" variant="vertical" />
              }
              <app-definition-item label="Yeux" [value]="p.eyeColor" variant="vertical" />
            </dl>
          </section>

          <app-homeworld-display [homeworldUrl]="p.homeworld" />
          <app-species-list [speciesUrls]="p.species" />
        </div>

        <app-vehicles-list [vehiclesUrls]="p.vehicles" />
        <app-starships-list [starshipsUrls]="p.starships" />

        <footer class="mt-6 p-6 rounded-lg bg-background border-2 border-secondary/50">
          <app-section-header icon="📊" title="Métadonnées de l'API" />
          <dl class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <app-definition-item label="Date de création" [value]="(p.created | date)!" size="large" />
            <app-definition-item label="Dernière modification" [value]="(p.edited | date)!" size="large" />
          </dl>
        </footer>
    </article>
  `,
})
export class PeopleDetailsComponent {
  public readonly person = input.required<People>();
  public readonly back = output<void>();
}
