import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { GET_PEOPLE_GATEWAY } from './domain/peoples/gateways/get-people-gateway.token';
import { HttpPeopleGateway } from './infra/peoples/http-people-gateway';
import { GET_HOMEWORLD_GATEWAY } from './domain/planets/gateways/get-homeworld-gateway.token';
import { HttpHomeworldGateway } from './infra/planets/http-homeworld-gateway';
import { GET_SPECIES_GATEWAY } from './domain/species/gateways/get-species-gateway.token';
import { HttpSpeciesGateway } from './infra/species/http-species-gateway';
import { GET_FILM_GATEWAY } from './domain/films/gateways/get-film-gateway.token';
import { HttpFilmGateway } from './infra/films/http-film-gateway';
import { GET_VEHICLE_GATEWAY } from './domain/vehicles/gateways/get-vehicle-gateway.token';
import { HttpVehicleGateway } from './infra/vehicles/http-vehicle-gateway';
import { GET_STARSHIP_GATEWAY } from './domain/starships/gateways/get-starship-gateway.token';
import { HttpStarshipGateway } from './infra/starships/http-starship-gateway';
import {DATE_PIPE_DEFAULT_OPTIONS} from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideHttpClient(withFetch()),
    { provide: GET_PEOPLE_GATEWAY, useClass: HttpPeopleGateway },
    { provide: GET_HOMEWORLD_GATEWAY, useClass: HttpHomeworldGateway },
    { provide: GET_SPECIES_GATEWAY, useClass: HttpSpeciesGateway },
    { provide: GET_FILM_GATEWAY, useClass: HttpFilmGateway },
    { provide: GET_VEHICLE_GATEWAY, useClass: HttpVehicleGateway },
    { provide: GET_STARSHIP_GATEWAY, useClass: HttpStarshipGateway },
    { provide: DATE_PIPE_DEFAULT_OPTIONS, useValue: { dateFormat: 'dd/MM/yyyy HH:mm'} },
  ],
};
