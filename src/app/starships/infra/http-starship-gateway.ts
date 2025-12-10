import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Starship } from '../domain/models/starship';
import { GetStarshipGateway } from '../domain/gateways/get-starship-gateway';
import { StarshipApi } from './starship-api';

@Injectable({ providedIn: 'root' })
export class HttpStarshipGateway implements GetStarshipGateway {
  private readonly http = inject(HttpClient);

  getStarship(url: string): Observable<Starship> {
    return this.http.get<StarshipApi>(url).pipe(
      map((api) => ({
        name: api.name,
        model: api.model,
      }))
    );
  }
}
