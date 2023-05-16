import { useState } from 'react';
import PokeInfo from './PokeInfo';
import PokemonTypeIcons from './Icons/PokemonTypeIcons';
import { PokemonDataModel } from './interface/PokemonDataModel';

interface PokeCardsProps {
   pokemon: PokemonDataModel;
}

const PokeCards = ({ pokemon }: PokeCardsProps) => {
   const [modalOpen, setModalOpen] = useState<boolean>(false);
   const handleModalOpen = () => {
      setModalOpen(true);
      document.body.style.overflow = 'hidden';
   };
   const handleModalClose = () => {
      setModalOpen(false);
      document.body.style.overflow = 'auto';
   };
   const checkPokemonType = (type: string) => {
      const matchingType = PokemonTypeIcons.find(
         (item) => type.toLowerCase() === item.name
      );
      if (matchingType) {
         return (
            <div
               key={type}
               className="flex items-center justify-center w-5 h-5 rounded-full"
               style={{ backgroundColor: matchingType.color }}
            >
               <div>{matchingType.icon}</div>
            </div>
         );
      }
   };
   return (
      <>
         <div
            className="bg-[#29292b] hover:bg-[#1f2026] shadow-md cursor-pointer flex flex-col items-center gap-y-4 rounded-lg  p-4 h-50 text-center transition-all duration-150 ease-linear w-full lg:max-w-[300px]"
            onClick={() => {
               handleModalOpen();
            }}
         >
            <div className="">
               <img src={pokemon.sprites.front_default} alt="" />
            </div>
            <div className="flex flex-col w-full mt-auto gap-y-2 ">
               <div className="flex items-center justify-center gap-x-4">
                  <h1 className="text-sm text-[#f7b916] font-bold capitalize ">
                     {pokemon.name}
                  </h1>
                  <div className="flex items-center gap-x-1">
                     {pokemon.types.map((type) => {
                        return checkPokemonType(type.type.name);
                     })}
                  </div>
               </div>
            </div>
         </div>
         {modalOpen && (
            <PokeInfo handleModalClose={handleModalClose} pokemon={pokemon} />
         )}
      </>
   );
};

export default PokeCards;
