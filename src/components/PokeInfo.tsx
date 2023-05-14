import { useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { PokemonDataModel } from './interface/PokemonDataModel';

interface PokeInfoProps {
   pokemon: PokemonDataModel;
   handleModalClose: () => void;
}

const PokeInfo = ({ handleModalClose, pokemon }: PokeInfoProps) => {
   const [activePokemonInfo, setActivePokemonInfo] = useState<number>(1);

   const convertHeightToCentimeters = (height: number) => {
      return height * 10;
   };
   const convertWeightToKilograms = (weight: number) => {
      return weight / 10;
   };
   return (
      <>
         <div className="bg-smoke-lightest inset-0 fixed top-0 left-0 right-0 z-50 px-3.5 sm:px-6 flex items-center justify-center w-full">
            {/* Card */}
            <div className="flex flex-col bg-[#1f2026] rounded-md px-4 py-6 w-[300px] ">
               {/* Header */}
               <div className="flex items-center justify-between">
                  <button
                     className="text-[#dedede] hover:text-[#fefefe] cursor-pointer transition-all duration-150 ease-linear"
                     onClick={handleModalClose}
                  >
                     <Icon
                        icon="ic:twotone-keyboard-backspace"
                        width="28"
                        height="28"
                     />
                  </button>
                  <h2 className="text-lg font-bold">#{pokemon.id}</h2>
               </div>
               <div className="flex justify-center py-4 rounded-sm">
                  <img
                     className="object-contain"
                     src={pokemon.sprites.front_default}
                     alt=""
                  />
               </div>
               <div className="flex flex-col gap-y-8">
                  <h2 className="text-xl font-bold text-center capitalize">
                     {pokemon.name}
                  </h2>
                  {/* Stats */}
                  <div className="flex flex-col px-4 sm gap-y-4 ">
                     <div className="grid grid-cols-3 text-sm ">
                        <h2
                           className={`${
                              activePokemonInfo === 1
                                 ? 'border-[#f7b916] text-[#f7b916]'
                                 : 'border-transparent text-[#66687d] hover:text-[#dedede]'
                           } border-b-2 cursor-pointer   pb-4 transition-all duration-150 ease-linear`}
                           onClick={() => setActivePokemonInfo(1)}
                        >
                           About
                        </h2>
                        <h2
                           className={`${
                              activePokemonInfo === 2
                                 ? 'border-[#f7b916] text-[#f7b916]'
                                 : 'border-transparent text-[#66687d] hover:text-[#f7b916]'
                           } border-b-2 cursor-pointer   pb-3 transition-all duration-150 ease-linear`}
                           onClick={() => setActivePokemonInfo(2)}
                        >
                           Stats
                        </h2>
                        <h2
                           className={`${
                              activePokemonInfo === 3
                                 ? 'border-[#f7b916] text-[#f7b916]'
                                 : 'border-transparent text-[#66687d] hover:text-[#f7b916]'
                           } border-b-2 cursor-pointer   pb-3 transition-all duration-150 ease-linear`}
                           onClick={() => setActivePokemonInfo(3)}
                        >
                           Types
                        </h2>
                     </div>
                     {/* About Info */}
                     {activePokemonInfo === 1 && (
                        <div className="flex text-sm gap-x-12">
                           <div className="text-[#b9bcca] space-y-1">
                              <h2>Species</h2>
                              <h2>Height</h2>
                              <h2>Weight</h2>
                              <h2>Abilities</h2>
                           </div>
                           <div className="text-[#f7b916] space-y-1">
                              <h2>{pokemon.species.name}</h2>
                              <h2>
                                 {convertHeightToCentimeters(pokemon.height)} cm
                              </h2>
                              <h2>
                                 {convertWeightToKilograms(pokemon.weight)} kg
                              </h2>
                              <h2 className="break-words">
                                 {pokemon.abilities
                                    .map((ability) => ability.ability.name)
                                    .join(', ')}
                              </h2>
                           </div>
                        </div>
                     )}
                     {activePokemonInfo === 2 && (
                        <div className="flex text-sm gap-x-12">
                           <div className="text-[#b9bcca] space-y-1">
                              <h2>HP</h2>
                              <h2>Attack</h2>
                              <h2>Def</h2>
                              <h2>Sp. Attack</h2>
                              <h2>Sp. Defense</h2>
                              <h2>Speed</h2>
                           </div>
                           <div className="text-[#f7b916] space-y-1">
                              {pokemon.stats.map((stat, index) => (
                                 <h2 key={index}>{stat.base_stat}</h2>
                              ))}
                           </div>
                        </div>
                     )}
                     {activePokemonInfo === 3 && (
                        <div className="">
                           {pokemon.types.map((type, index) => (
                              <div
                                 key={index}
                                 className="flex items-center text-sm gap-x-12"
                              >
                                 <h2 className="text-[#b9bcca] pb-1">
                                    Type {type.slot}
                                 </h2>
                                 <h2 className="text-[#f7b916] pb-1">
                                    {type.type.name}
                                 </h2>
                              </div>
                           ))}
                        </div>
                     )}
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default PokeInfo;
