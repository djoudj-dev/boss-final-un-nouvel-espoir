import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Homeworld } from '../domain/models/homeworld';
import { GetHomeworldGateway } from '../domain/gateways/get-homeworld-gateway';
import { HomeworldApi } from './homeworld-api';

@Injectable({ providedIn: 'root' })
export class HttpHomeworldGateway implements GetHomeworldGateway {
  private readonly http = inject(HttpClient);

  async getHomeworld(url: string): Promise<Homeworld> {
    const api = await firstValueFrom(this.http.get<HomeworldApi>(url));
    return {
      name: api.name,
      population: api.population,
    };
  }
}
