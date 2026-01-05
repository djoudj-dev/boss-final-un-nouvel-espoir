import { Component, inject, signal } from '@angular/core';
import { PeopleListComponent } from './application/peoples/people-list';
import { PeopleDetailsComponent } from './application/peoples/people-details';
import { GetPeopleUseCase } from './domain/peoples/use-cases/get-people';
import { People } from './domain/peoples/models/people';

@Component({
  selector: 'app-root',
  imports: [PeopleListComponent, PeopleDetailsComponent],
  template: `
    <div class="min-h-screen bg-background">
      <header class="py-6 border-b-2 bg-gray border-secondary">
        <h1 class="text-5xl font-bold text-center text-primary drop-shadow-secondary font-orbitron">
          Star Wars Universe
        </h1>
      </header>

      <main>
        @if (selectedPerson(); as person) {
        <app-people-details [person]="person" (back)="selectedPerson.set(null)" />
        } @else {
        <app-people-list [people]="getPeopleUseCase.viewModel().people" (personSelected)="selectedPerson.set($event)" />
        }
      </main>
    </div>
  `,
})
export class App {
  protected readonly getPeopleUseCase = inject(GetPeopleUseCase);
  protected readonly selectedPerson = signal<People | null>(null);
}
