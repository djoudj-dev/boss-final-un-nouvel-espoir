import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { DatePipe } from '@angular/common';
import { People } from '../domain/models/people';
import { HomeworldDisplayComponent } from '../../planets/application/homeworld-display';
import { SpeciesListComponent } from '../../species/application/species-list';
import { FilmsListComponent } from '../../films/application/films-list';
import { VehiclesListComponent } from '../../vehicles/application/vehicles-list';
import { StarshipsListComponent } from '../../starships/application/starships-list';

@Component({
  selector: 'app-people-details',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DatePipe,
    HomeworldDisplayComponent,
    SpeciesListComponent,
    FilmsListComponent,
    VehiclesListComponent,
    StarshipsListComponent,
  ],
  template: `
    <div class="container mx-auto px-4 py-8">
      <div class="mb-6">
        <button class="button-sw" (click)="back.emit()">Retour à la liste</button>
      </div>

      @if (person(); as p) {
      <div class="card-sw max-w-5xl mx-auto">
        <div class="text-center mb-8">
          <h1 class="text-5xl font-bold text-primary mb-2">{{ p.name }}</h1>
          <div class="h-1 w-24 bg-secondary rounded mx-auto"></div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div class="p-6 rounded-lg bg-background border-2 border-secondary">
            <h3 class="text-xl font-bold mb-4 text-secondary flex items-center gap-2">
              <span class="text-2xl">👤</span> Caractéristiques
            </h3>
            <div class="space-y-3">
              <div class="flex justify-between items-center py-2 border-b border-secondary/30">
                <span class="text-gray-400">Taille</span>
                <span class="font-bold text-primary text-lg">{{ p.height }} cm</span>
              </div>
              <div class="flex justify-between items-center py-2 border-b border-secondary/30">
                <span class="text-gray-400">Poids</span>
                <span class="font-bold text-primary text-lg">{{ p.mass }} kg</span>
              </div>
              <div class="flex justify-between items-center py-2 border-b border-secondary/30">
                <span class="text-gray-400">Année de naissance</span>
                <span class="font-bold text-primary text-lg">{{ p.birthYear }}</span>
              </div>
              <div class="flex justify-between items-center py-2">
                <span class="text-gray-400">Genre</span>
                <span class="font-bold text-primary text-lg">{{ p.gender }}</span>
              </div>
            </div>
          </div>

          <div class="p-6 rounded-lg bg-background border-2 border-secondary">
            <h3 class="text-xl font-bold mb-4 text-secondary flex items-center gap-2">
              <span class="text-2xl">✨</span> Apparence
            </h3>
            <div class="space-y-3">
              @if (p.hairColors.length > 0) {
              <div class="py-2 border-b border-secondary/30">
                <span class="text-gray-400 block mb-1">Cheveux</span>
                <span class="text-primary font-semibold">{{ p.hairColors.join(', ') }}</span>
              </div>
              }
              @if (p.skinColors.length > 0) {
              <div class="py-2 border-b border-secondary/30">
                <span class="text-gray-400 block mb-1">Peau</span>
                <span class="text-primary font-semibold">{{ p.skinColors.join(', ') }}</span>
              </div>
              }
              <div class="py-2">
                <span class="text-gray-400 block mb-1">Yeux</span>
                <span class="text-primary font-semibold">{{ p.eyeColor }}</span>
              </div>
            </div>
          </div>

          <app-homeworld-display [homeworldUrl]="p.homeworld" />
          <app-species-list [speciesUrls]="p.species" />
        </div>

        <app-films-list [filmsUrls]="p.films" />
        <app-vehicles-list [vehiclesUrls]="p.vehicles" />
        <app-starships-list [starshipsUrls]="p.starships" />

        <div class="mt-6 p-6 rounded-lg bg-background border-2 border-secondary/50">
          <h3 class="text-xl font-bold mb-4 text-secondary flex items-center gap-2">
            <span class="text-2xl">📊</span> Métadonnées de l'API
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="flex justify-between items-center py-2 border-b border-secondary/30">
              <span class="text-gray-400">Date de création</span>
              <span class="font-bold text-primary">{{ p.created | date: 'dd/MM/yyyy HH:mm' }}</span>
            </div>
            <div class="flex justify-between items-center py-2 border-b border-secondary/30">
              <span class="text-gray-400">Dernière modification</span>
              <span class="font-bold text-primary">{{ p.edited | date: 'dd/MM/yyyy HH:mm' }}</span>
            </div>
          </div>
        </div>
      </div>
      }
    </div>
  `,
})
export class PeopleDetailsComponent {
  public readonly person = input.required<People>();
  public readonly back = output<void>();
}
