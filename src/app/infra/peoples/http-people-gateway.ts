import { inject, Injectable, signal, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { People, Gender } from '../../domain/peoples/models/people';
import { GetPeopleGateway } from '../../domain/peoples/gateways/get-people-gateway';
import { PeopleApi } from './people-api';

@Injectable({ providedIn: 'root' })
export class HttpPeopleGateway implements GetPeopleGateway {
  private readonly _http = inject(HttpClient);
  private readonly _apiUrl = 'https://swapi.info/api/people';
  private readonly _dataSignal = signal<People[]>([]);
  private readonly _loadingSignal = signal<boolean>(false);
  private readonly _errorSignal = signal<unknown>(undefined);

  public readonly peopleResource = {
    value: this._dataSignal.asReadonly(),
    isLoading: this._loadingSignal.asReadonly(),
    error: this._errorSignal.asReadonly(),
  };

  private readonly _fetchEffect = effect(() => {
    this._loadingSignal.set(true);
    this._errorSignal.set(undefined);

    firstValueFrom(this._http.get<PeopleApi[]>(this._apiUrl))
      .then(apiData => {
        this._dataSignal.set(apiData.map(api => this._mapApiToDomain(api)));
        this._loadingSignal.set(false);
      })
      .catch(error => {
        this._errorSignal.set(error);
        this._dataSignal.set([]);
        this._loadingSignal.set(false);
      });
  });

  private _mapApiToDomain(api: PeopleApi): People {
    return {
      id: api.url,
      name: api.name,
      height: this._parseNumber(api.height),
      mass: this._parseNumber(api.mass),
      birthYear: api.birth_year,
      hairColors: this._parseColors(api.hair_color),
      skinColors: this._parseColors(api.skin_color),
      eyeColor: api.eye_color,
      gender: this._mapGender(api.gender),
      homeworld: api.homeworld,
      species: api.species,
      films: api.films,
      vehicles: api.vehicles,
      starships: api.starships,
      created: new Date(api.created),
      edited: new Date(api.edited),
    };
  }

  private _parseNumber(value: string): number {
    const parsed = parseInt(value, 10);
    return isNaN(parsed) ? 0 : parsed;
  }

  private _parseColors(colors: string): string[] {
    if (colors === 'n/a' || colors === 'none' || colors === 'unknown') {
      return [];
    }
    return colors.split(',').map((color) => color.trim());
  }

  private _mapGender(gender: string): Gender {
    switch (gender.toLowerCase()) {
      case 'male':
        return Gender.Male;
      case 'female':
        return Gender.Female;
      case 'hermaphrodite':
      case 'none':
      case 'n/a':
      default:
        return Gender.None;
    }
  }
}
