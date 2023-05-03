import React from 'react';

interface AppModel {
   pokemonList: string[];
   loading: boolean;
   error: string;
}

const PokemonList = ({ pokemonList, loading, error }: AppModel) => {
   return (
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
         {pokemonList.map((poke) => {
            return (
               <div
                  key={poke}
                  className="bg-[#16171d] rounded-md  h-20 py-2 text-center"
               >
                  <div>{poke}</div>
               </div>
            );
         })}
      </div>
   );
};

export default PokemonList;
