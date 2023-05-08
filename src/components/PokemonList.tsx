import React from 'react';
import PokeCards from './PokeCards';
import { PokemonDataModel } from './interface/PokemonDataModel';

interface PokemonListProps {
   pokemon: PokemonDataModel[];
   loading: boolean;
   error: string;
}

const PokemonList = ({ loading, error, pokemon }: PokemonListProps) => {
   return (
      <>
         {loading && <div>Loading...</div>}
         {error && <div>{error}</div>}
         {!loading && !error && (
            <div className="grid w-full gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  sm:place-content-center lg:max-w-[900px] h-full">
               {/* <div className="flex flex-wrap justify-center w-full gap-8 xl:max-w-[1200px]"> */}
               {pokemon.map((item: PokemonDataModel) => {
                  return <PokeCards key={item.id} pokemon={item} />;
               })}
               {/* </div> */}

               {/* <div className="flex flex-wrap justify-center w-full gap-8 xl:max-w-[1200px]"> */}
               {/* {pokemonList.map((poke) => {
                  return <PokeCards key={poke} poke={poke} />;
               })} */}
            </div>
         )}
      </>
   );
};

export default PokemonList;
