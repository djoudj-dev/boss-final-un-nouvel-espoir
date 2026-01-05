import { inject, Injectable, signal, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Species } from '../../domain/species/models/species';
import { GetSpeciesGateway } from '../../domain/species/gateways/get-species-gateway';
import { SpeciesApi } from './species-api';
import { handlePromiseAllWithSignals } from '../../shared/utils/promise-signal-handler';

@Injectable({ providedIn: 'root' })
export class HttpSpeciesGateway implements GetSpeciesGateway {
  private readonly _http = inject(HttpClient);
  private readonly _urlsSignal = signal<string[]>([]);
  private readonly _dataSignal = signal<Species[]>([]);
  private readonly _loadingSignal = signal<boolean>(false);
  private readonly _errorSignal = signal<unknown>(undefined);

  public readonly speciesResource = {
    value: this._dataSignal.asReadonly(),
    isLoading: this._loadingSignal.asReadonly(),
    error: this._errorSignal.asReadonly(),
  };

  private readonly _fetchEffect = effect(() => {
    const urls = this._urlsSignal();
    if (!urls || urls.length === 0) {
      this._dataSignal.set([]);
      return;
    }

    this._loadingSignal.set(true);
    this._errorSignal.set(undefined);

    const promises = urls.map(url =>
      firstValueFrom(this._http.get<SpeciesApi>(url))
    );

    handlePromiseAllWithSignals(promises, {
      dataSignal: this._dataSignal,
      loadingSignal: this._loadingSignal,
      errorSignal: this._errorSignal,
      mapper: (api) => this._mapApiToDomain(api),
    });
  });

  public setUrls(urls: string[]): void {
    this._urlsSignal.set(urls);
  }

  private _mapApiToDomain(api: SpeciesApi): Species {
    return {
      name: api.name,
      language: api.language,
    };
  }
}
