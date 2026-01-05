import { inject, Injectable, computed } from '@angular/core';
import { GET_FILM_GATEWAY } from '../gateways/get-film-gateway.token';
import { Film } from '../models/film';

export interface FilmsViewModel {
  readonly films: Film[];
  readonly isLoading: boolean;
  readonly error: unknown;
}

@Injectable({ providedIn: 'root' })
export class GetFilmsUseCase {
  private readonly _gateway = inject(GET_FILM_GATEWAY);

  public readonly viewModel = computed<FilmsViewModel>(() => ({
    films: this._gateway.filmsResource.value(),
    isLoading: this._gateway.filmsResource.isLoading(),
    error: this._gateway.filmsResource.error(),
  }));

  public setUrls(urls: string[]): void {
    this._gateway.setUrls(urls);
  }
}
