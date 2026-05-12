export type StarWarsCharacter = {
  name: string;
  height: string;
  mass: string;
  gender: string;
  birth_year: string;
  homeworld: string;
  url: string;
};

export type StarWarsPeopleResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: StarWarsCharacter[];
};
