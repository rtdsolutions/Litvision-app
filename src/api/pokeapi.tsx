import axios from "axios";

export const pokeAPI = axios.create();

export const pokemonSprite =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork";
export const baseUrlPokeAPI =
  "https://905d-135-181-0-109.ngrok-free.app" + "/api/v1";
export const entrylinkUrlAPI = "http://test.entrylink.io/api/v1/auth/login";
