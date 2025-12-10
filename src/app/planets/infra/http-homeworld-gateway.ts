import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Homeworld } from '../domain/models/homeworld';
import { GetHomeworldGateway } from '../domain/gateways/get-homeworld-gateway';
import { HomeworldApi } from './homeworld-api';

@Injectable({ providedIn: 'root' })
export class HttpHomeworldGateway implements GetHomeworldGateway {
  private readonly http = inject(HttpClient);

  getHomeworld(url: string): Observable<Homeworld> {
    return this.http.get<HomeworldApi>(url).pipe(
      map((api) => ({
        name: api.name,
        population: api.population,
      }))
    );
  }
}
