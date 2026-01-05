import { inject, Injectable, computed } from '@angular/core';
import { GET_STARSHIP_GATEWAY } from '../gateways/get-starship-gateway.token';
import { Starship } from '../models/starship';

export interface StarshipsViewModel {
  readonly starships: Starship[];
  readonly isLoading: boolean;
  readonly error: unknown;
}

@Injectable({ providedIn: 'root' })
export class GetStarshipsUseCase {
  private readonly _gateway = inject(GET_STARSHIP_GATEWAY);

  public readonly viewModel = computed<StarshipsViewModel>(() => ({
    starships: this._gateway.starshipsResource.value(),
    isLoading: this._gateway.starshipsResource.isLoading(),
    error: this._gateway.starshipsResource.error(),
  }));

  public setUrls(urls: string[]): void {
    this._gateway.setUrls(urls);
  }
}
