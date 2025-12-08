import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { GET_PEOPLE_GATEWAY } from './peoples/domain/gateways/get-people-gateway.token';
import { HttpPeopleGateway } from './peoples/infra/http-people-gateway';
import { GET_HOMEWORLD_GATEWAY } from './planets/domain/gateways/get-homeworld-gateway.token';
import { HttpHomeworldGateway } from './planets/infra/http-homeworld-gateway';
import { GET_SPECIES_GATEWAY } from './species/domain/gateways/get-species-gateway.token';
import { HttpSpeciesGateway } from './species/infra/http-species-gateway';
import { GET_FILM_GATEWAY } from './films/domain/gateways/get-film-gateway.token';
import { HttpFilmGateway } from './films/infra/http-film-gateway';
import { GET_VEHICLE_GATEWAY } from './vehicles/domain/gateways/get-vehicle-gateway.token';
import { HttpVehicleGateway } from './vehicles/infra/http-vehicle-gateway';
import { GET_STARSHIP_GATEWAY } from './starships/domain/gateways/get-starship-gateway.token';
import { HttpStarshipGateway } from './starships/infra/http-starship-gateway';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()),
    { provide: GET_PEOPLE_GATEWAY, useClass: HttpPeopleGateway },
    { provide: GET_HOMEWORLD_GATEWAY, useClass: HttpHomeworldGateway },
    { provide: GET_SPECIES_GATEWAY, useClass: HttpSpeciesGateway },
    { provide: GET_FILM_GATEWAY, useClass: HttpFilmGateway },
    { provide: GET_VEHICLE_GATEWAY, useClass: HttpVehicleGateway },
    { provide: GET_STARSHIP_GATEWAY, useClass: HttpStarshipGateway },
  ],
};
