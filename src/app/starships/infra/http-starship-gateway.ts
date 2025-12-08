import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Starship } from '../domain/models/starship';
import { GetStarshipGateway } from '../domain/gateways/get-starship-gateway';
import { StarshipApi } from './starship-api';

@Injectable({ providedIn: 'root' })
export class HttpStarshipGateway implements GetStarshipGateway {
  private readonly http = inject(HttpClient);

  async getStarship(url: string): Promise<Starship> {
    const api = await firstValueFrom(this.http.get<StarshipApi>(url));
    return {
      name: api.name,
      model: api.model,
    };
  }
}
