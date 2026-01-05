import { inject, Injectable, computed } from '@angular/core';
import { GET_PEOPLE_GATEWAY } from '../gateways/get-people-gateway.token';
import { People } from '../models/people';

export interface PeopleViewModel {
  readonly people: People[];
  readonly isLoading: boolean;
  readonly error: unknown;
}

@Injectable({ providedIn: 'root' })
export class GetPeopleUseCase {
  private readonly _gateway = inject(GET_PEOPLE_GATEWAY);

  public readonly viewModel = computed<PeopleViewModel>(() => ({
    people: this._gateway.peopleResource.value() ?? [],
    isLoading: this._gateway.peopleResource.isLoading(),
    error: this._gateway.peopleResource.error() }));
}
