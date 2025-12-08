import { inject, Injectable, resource } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { People, Gender } from '../domain/models/people';
import { GetPeopleGateway } from '../domain/gateways/get-people-gateway';
import { PeopleApi } from './people-api';

@Injectable({ providedIn: 'root' })
export class HttpPeopleGateway implements GetPeopleGateway {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://swapi.info/api/people';

  readonly peopleResource = resource({
    loader: async () => {
      const apiData = await firstValueFrom(this.http.get<PeopleApi[]>(this.apiUrl));
      return apiData.map((api) => this.mapApiToDomain(api));
    },
  });

  private mapApiToDomain(api: PeopleApi): People {
    return {
      id: api.url,
      name: api.name,
      height: this.parseNumber(api.height),
      mass: this.parseNumber(api.mass),
      birthYear: api.birth_year,
      hairColors: this.parseColors(api.hair_color),
      skinColors: this.parseColors(api.skin_color),
      eyeColor: api.eye_color,
      gender: this.mapGender(api.gender),
      homeworld: api.homeworld,
      species: api.species,
      films: api.films,
      vehicles: api.vehicles,
      starships: api.starships,
      created: new Date(api.created),
      edited: new Date(api.edited),
    };
  }

  private parseNumber(value: string): number {
    const parsed = parseInt(value, 10);
    return isNaN(parsed) ? 0 : parsed;
  }

  private parseColors(colors: string): string[] {
    if (colors === 'n/a' || colors === 'none' || colors === 'unknown') {
      return [];
    }
    return colors.split(',').map((color) => color.trim());
  }

  private mapGender(gender: string): Gender {
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
