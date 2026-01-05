import { inject, Injectable, signal, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Homeworld } from '../../domain/planets/models/homeworld';
import { GetHomeworldGateway } from '../../domain/planets/gateways/get-homeworld-gateway';
import { HomeworldApi } from './homeworld-api';

@Injectable({ providedIn: 'root' })
export class HttpHomeworldGateway implements GetHomeworldGateway {
  private readonly _http = inject(HttpClient);
  private readonly _urlSignal = signal<string>('');
  private readonly _dataSignal = signal<Homeworld | undefined>(undefined);
  private readonly _loadingSignal = signal<boolean>(false);
  private readonly _errorSignal = signal<unknown>(undefined);

  public readonly homeworldResource = {
    value: this._dataSignal.asReadonly(),
    isLoading: this._loadingSignal.asReadonly(),
    error: this._errorSignal.asReadonly(),
  };

  private readonly _fetchEffect = effect(() => {
    const url = this._urlSignal();
    if (!url) {
      this._dataSignal.set(undefined);
      return;
    }

    this._loadingSignal.set(true);
    this._errorSignal.set(undefined);

    firstValueFrom(this._http.get<HomeworldApi>(url))
      .then(apiData => {
        this._dataSignal.set(this._mapApiToDomain(apiData));
        this._loadingSignal.set(false);
      })
      .catch(error => {
        this._errorSignal.set(error);
        this._loadingSignal.set(false);
      });
  });

  public setUrl(url: string): void {
    this._urlSignal.set(url);
  }

  private _mapApiToDomain(api: HomeworldApi): Homeworld {
    return {
      name: api.name,
      population: api.population,
    };
  }
}
