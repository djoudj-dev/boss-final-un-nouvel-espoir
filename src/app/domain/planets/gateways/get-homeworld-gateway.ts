import { Signal } from '@angular/core';
import { Homeworld } from '../models/homeworld';

export interface GetHomeworldGateway {
  readonly homeworldResource: {
    value: Signal<Homeworld | undefined>;
    isLoading: Signal<boolean>;
    error: Signal<unknown>;
  };
  setUrl(url: string): void;
}

export { GET_HOMEWORLD_GATEWAY } from './get-homeworld-gateway.token';
