import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Species } from '../domain/models/species';
import { GetSpeciesGateway } from '../domain/gateways/get-species-gateway';
import { SpeciesApi } from './species-api';

@Injectable({ providedIn: 'root' })
export class HttpSpeciesGateway implements GetSpeciesGateway {
  private readonly http = inject(HttpClient);

  getSpecies$(url: string): Observable<Species> {
    return this.http.get<SpeciesApi>(url).pipe(
      map((api) => ({
        name: api.name,
        language: api.language,
      }))
    );
  }
}
