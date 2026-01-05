import { inject, Injectable, computed } from '@angular/core';
import { GET_HOMEWORLD_GATEWAY } from '../gateways/get-homeworld-gateway.token';
import { Homeworld } from '../models/homeworld';

export interface HomeworldViewModel {
  readonly homeworld: Homeworld | undefined;
  readonly isLoading: boolean;
  readonly error: unknown;
}

@Injectable({ providedIn: 'root' })
export class GetHomeworldUseCase {
  private readonly _gateway = inject(GET_HOMEWORLD_GATEWAY);

  public readonly viewModel = computed<HomeworldViewModel>(() => ({
    homeworld: this._gateway.homeworldResource.value(),
    isLoading: this._gateway.homeworldResource.isLoading(),
    error: this._gateway.homeworldResource.error(),
  }));

  public setUrl(url: string): void {
    this._gateway.setUrl(url);
  }
}
