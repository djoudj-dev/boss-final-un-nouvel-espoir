import { inject, Injectable, computed } from '@angular/core';
import { GET_PEOPLE_GATEWAY } from '../gateways/get-people-gateway.token';

@Injectable({ providedIn: 'root' })
export class GetPeopleUseCase {
  private readonly gateway = inject(GET_PEOPLE_GATEWAY);

  public readonly people = computed(() => this.gateway.peopleResource.value() ?? []);
  public readonly isLoading = computed(() => this.gateway.peopleResource.isLoading());
  public readonly error = computed(() => this.gateway.peopleResource.error());
}
