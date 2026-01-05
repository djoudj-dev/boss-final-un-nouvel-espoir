export enum Gender {
  Male = 'male',
  Female = 'female',
  None = 'none',
}

export interface People {
  id: string;
  name: string;
  height: number;
  mass: number;
  birthYear: string;
  hairColors: string[];
  skinColors: string[];
  eyeColor: string;
  gender: Gender;
  homeworld: string;
  species: string[];
  films: string[];
  vehicles: string[];
  starships: string[];
  created: Date;
  edited: Date;
}
