import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { People } from '../domain/models/people';

@Component({
  selector: 'app-people-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div class="container mx-auto px-4 py-8">
      <h2 class="text-3xl font-bold mb-6 text-center text-primary">Personnages Star Wars</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        @for (person of people(); track person.id) {
        <div
          datatest-id="people-item"
          class="card-sw cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl"
          (click)="personSelected.emit(person)"
        >
          <div class="mb-4">
            <h3 class="text-2xl font-bold text-primary mb-2">{{ person.name }}</h3>
            <div class="h-1 w-16 bg-secondary rounded"></div>
          </div>

          <div class="space-y-3">
            <div class="flex justify-between items-center py-2 border-b border-secondary/30">
              <span class="text-gray-400 text-sm">Taille</span>
              <span class="font-semibold text-primary">{{ person.height }} cm</span>
            </div>
            <div class="flex justify-between items-center py-2 border-b border-secondary/30">
              <span class="text-gray-400 text-sm">Poids</span>
              <span class="font-semibold text-primary">{{ person.mass }} kg</span>
            </div>
            <div class="flex justify-between items-center py-2 border-b border-secondary/30">
              <span class="text-gray-400 text-sm">Naissance</span>
              <span class="font-semibold text-primary">{{ person.birthYear }}</span>
            </div>
            <div class="flex justify-between items-center py-2 border-b border-secondary/30">
              <span class="text-gray-400 text-sm">Genre</span>
              <span class="font-semibold text-primary">{{ person.gender }}</span>
            </div>
            @if (person.eyeColor && person.eyeColor !== 'n/a') {
            <div class="flex justify-between items-center py-2 border-b border-secondary/30">
              <span class="text-gray-400 text-sm">Yeux</span>
              <span class="font-semibold text-primary">{{ person.eyeColor }}</span>
            </div>
            }
          </div>

          <div class="mt-6">
            <button class="button-sw w-full">Voir les détails</button>
          </div>
        </div>
        }
      </div>
    </div>
  `,
})
export class PeopleListComponent {
  public readonly people = input<People[]>();
  public readonly personSelected = output<People>();
}
