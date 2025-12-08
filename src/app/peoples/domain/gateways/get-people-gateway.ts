import { ResourceRef } from '@angular/core';
import { People } from '../models/people';

export interface GetPeopleGateway {
  readonly peopleResource: ResourceRef<People[] | undefined>;
}

export { GET_PEOPLE_GATEWAY } from './get-people-gateway.token';
