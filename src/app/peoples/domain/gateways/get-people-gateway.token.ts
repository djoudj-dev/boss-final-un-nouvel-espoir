import { InjectionToken } from '@angular/core';
import { GetPeopleGateway } from './get-people-gateway';

export const GET_PEOPLE_GATEWAY = new InjectionToken<GetPeopleGateway>(
  'GetPeopleGateway'
);
