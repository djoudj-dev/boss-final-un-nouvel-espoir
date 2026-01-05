import { inject, Injectable, computed } from '@angular/core';
import { GET_SPECIES_GATEWAY } from '../gateways/get-species-gateway.token';
import { Species } from '../models/species';

export interface SpeciesViewModel {
  readonly species: Species[];
  readonly isLoading: boolean;
  readonly error: unknown;
}

@Injectable({ providedIn: 'root' })
export class GetSpeciesUseCase {
  private readonly _gateway = inject(GET_SPECIES_GATEWAY);

  public readonly viewModel = computed<SpeciesViewModel>(() => ({
    species: this._gateway.speciesResource.value(),
    isLoading: this._gateway.speciesResource.isLoading(),
    error: this._gateway.speciesResource.error(),
  }));

  public setUrls(urls: string[]): void {
    this._gateway.setUrls(urls);
  }
}
