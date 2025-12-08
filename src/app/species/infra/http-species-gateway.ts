import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Species } from '../domain/models/species';
import { GetSpeciesGateway } from '../domain/gateways/get-species-gateway';
import { SpeciesApi } from './species-api';

@Injectable({ providedIn: 'root' })
export class HttpSpeciesGateway implements GetSpeciesGateway {
  private readonly http = inject(HttpClient);

  async getSpecies(url: string): Promise<Species> {
    const api = await firstValueFrom(this.http.get<SpeciesApi>(url));
    return {
      name: api.name,
      language: api.language,
    };
  }
}
