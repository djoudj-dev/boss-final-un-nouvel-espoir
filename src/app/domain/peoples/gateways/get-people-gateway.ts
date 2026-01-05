import { Signal } from '@angular/core';
import { People } from '../models/people';

export interface GetPeopleGateway {
  readonly peopleResource: {
    value: Signal<People[]>;
    isLoading: Signal<boolean>;
    error: Signal<unknown>;
  };
}
