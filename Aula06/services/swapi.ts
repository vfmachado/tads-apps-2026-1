import axios from "axios";

import { StarWarsPeopleResponse } from "../types/star-wars";

const swapi = axios.create({
  baseURL: "https://swapi.dev/api",
  timeout: 10000,
});

export async function getPeople(page = 1) {
  const response = await swapi.get<StarWarsPeopleResponse>("/people", {
    params: { page },
  });

  return response.data;
}
