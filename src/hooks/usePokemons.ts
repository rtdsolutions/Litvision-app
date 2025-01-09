import {useContext, useEffect, useRef, useState} from 'react';

import {baseUrlPokeAPI, pokeAPI, pokemonSprite} from '../api/pokeapi';
import {Store} from '../context/store';

import type {
  Result,
  PokemonCustom,
  PokemonsResponse,
} from '../types/pokemonList';
import type {RequestStatus} from '../types/requestStatus';

export const usePokemons = () => {
  const [status, setStatus] = useState<RequestStatus>('idle');
  const [pokemons, setPokemons] = useState<PokemonCustom[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const {dispatch} = useContext(Store);
  const limit = 14;

  const buildPokemonCustom = (list: Result[]) => {
    setStatus('loading');

    const appendPokemons: PokemonCustom[] = list.map(({name, url}) => {
      const urlSplit = url.split('/');
      const id = urlSplit[urlSplit.length - 2];
      const picture = `${pokemonSprite}/${id}.png`;

      return {id, picture, name};
    });

    setPokemons([...appendPokemons]);
    dispatch({type: 'SET_POKEMONS', payload: [...appendPokemons]});
    setStatus('success');
  };

  const getPokemons = async (pageNum: number) => {
    try {
      setLoading(true);
      const offset = (pageNum - 1) * limit;
      const url = `${baseUrlPokeAPI}/pokemon?${
        offset ? `offset=${offset}&` : ''
      }limit=${limit}`;
      const {data} = await pokeAPI.get<PokemonsResponse>(url);

      setTotalPages(Math.ceil(data.count / limit));
      buildPokemonCustom(data.results);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setPokemons([]);
      setStatus('error');
      setLoading(false);
    }
  };

  const searchPokemon = async (searchString: string) => {
    const url = `${baseUrlPokeAPI}/pokemon/search/${searchString}`;
    try {
      setLoading(true);
      const {data} = await pokeAPI.get(url);
      const id = String(data.id);
      const picture = `${pokemonSprite}/${id}.png`;
      setLoading(false);
      return {
        id,
        picture,
        name: data.name,
      };
    } catch (error) {
      setLoading(false);
      return false;
    }
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      getPokemons(1);
    }

    return () => {
      isMounted = false;
    };
  }, []);

  return {totalPages, pokemons, status, getPokemons, loading, searchPokemon};
};
