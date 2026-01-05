import { inject, Injectable, signal, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Film } from '../../domain/films/models/film';
import { GetFilmGateway } from '../../domain/films/gateways/get-film-gateway';
import { FilmApi } from './film-api';
import { handlePromiseAllWithSignals } from '../../shared/utils/promise-signal-handler';

@Injectable({ providedIn: 'root' })
export class HttpFilmGateway implements GetFilmGateway {
  private readonly _http = inject(HttpClient);
  private readonly _urlsSignal = signal<string[]>([]);
  private readonly _dataSignal = signal<Film[]>([]);
  private readonly _loadingSignal = signal<boolean>(false);
  private readonly _errorSignal = signal<unknown>(undefined);

  public readonly filmsResource = {
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
      firstValueFrom(this._http.get<FilmApi>(url))
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

  private _mapApiToDomain(api: FilmApi): Film {
    return {
      title: api.title,
      releaseDate: api.release_date,
    };
  }
}
