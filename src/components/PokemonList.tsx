import PokeCards from './PokeCards';
import { PokemonDataModel } from './interface/PokemonDataModel';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import SkeletonLoading from './utilities/SkeletonLoading';

interface PokemonListProps {
   pokemon: PokemonDataModel[];
   loading: boolean;
   error: string;
}

const PokemonList = ({ loading, error, pokemon }: PokemonListProps) => {
   return (
      <>
         {!loading && error && <div>{error}</div>}
         {!error && (
            <div className="grid w-full gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4    h-full">
               {pokemon.map((item: PokemonDataModel) => {
                  return <PokeCards key={item.id} pokemon={item} />;
               })}
               {loading && <SkeletonLoading amount={12} />}
            </div>
         )}
      </>
   );
};

export default PokemonList;
