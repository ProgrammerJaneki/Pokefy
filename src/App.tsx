import { useState, useEffect, Suspense, ChangeEvent, lazy } from 'react';
import axios from 'axios';
import { PokemonDataModel } from './components/interface/PokemonDataModel';
import SearchBar from './components/SearchBar';
import useDebounce from './components/utilities/useDebounce';
const PokemonList = lazy(() => import('./components/PokemonList'));
import InfiniteScroll from 'react-infinite-scroll-component';
import { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import SkeletonLoading from './components/utilities/SkeletonLoading';

function App() {
   const [pokemonList, setPokemonList] = useState<PokemonDataModel[]>([]);
   const [loading, setLoading] = useState<boolean>(false);
   const [error, setError] = useState<string>('');
   const [currentPage, setCurrentPage] = useState<string>(
      `https://pokeapi.co/api/v2/pokemon/`
   );
   const [nextPage, setNextPage] = useState<string>('');
   const [prevPage, setPrevPage] = useState<string>('');
   const [pageNumber, setPageNumber] = useState<number>(1);
   const [searchQuery, setSearchQuery] = useState<string>('');
   const debouncedSearchQuery = useDebounce(searchQuery, 500);
   const handleSetSearchQuery = (event: ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(event.target.value);
   };

   const getPokemonList = async () => {
      setError('');
      try {
         setLoading(true);
         const searchUrl = debouncedSearchQuery
            ? `https://pokeapi.co/api/v2/pokemon/${searchQuery.toLowerCase()}`
            : currentPage;
         const pokemonListData = await axios.get(searchUrl);
         if (Array.isArray(pokemonListData.data.results)) {
            const { results, previous, next } = pokemonListData.data;
            setPrevPage(previous);
            setNextPage(next);
            const pokemonDataList = await Promise.all(
               results.map(async (result: { url: string }) => {
                  const { data } = await axios.get<PokemonDataModel>(
                     result.url
                  ); // I am getting the exact data from this url
                  const pokemonData: PokemonDataModel = {
                     id: data.id,
                     name: data.name,
                     height: data.height,
                     weight: data.weight,
                     types: data.types,
                     abilities: data.abilities,
                     stats: data.stats,
                     species: data.species,
                     sprites: data.sprites,
                  };
                  return pokemonData;
               })
            );
            const newPokemonDataList = pokemonDataList.filter(
               (pokemon) => !pokemonList.find((p) => p.id === pokemon.id)
            );
            setPokemonList([...pokemonList, ...newPokemonDataList]);
            setLoading(false);
         } else {
            const { data } = pokemonListData;
            const pokemonData: PokemonDataModel = {
               id: data.id,
               name: data.name,
               height: data.height,
               weight: data.weight,
               types: data.types,
               abilities: data.abilities,
               stats: data.stats,
               species: data.species,
               sprites: data.sprites,
            };
            setTimeout(() => {
               setPokemonList([pokemonData]);
               setLoading(false);
            }, 500);
         }
      } catch (err: any) {
         if (err.response.data === 'Not Found') {
            setTimeout(() => {
               setError('No results');
               setLoading(false);
            }, 500);
         } else {
            setError('');
         }
      }
   };

   useEffect(() => {
      setPokemonList([]);
   }, [debouncedSearchQuery]);

   useEffect(() => {
      getPokemonList();
   }, [debouncedSearchQuery, currentPage]);

   const handleNextPage = () => {
      setLoading(true);
      setTimeout(() => {
         setCurrentPage(nextPage);
         setPageNumber(pageNumber + 1);
      }, 1000);
   };

   return (
      <>
         <div className="bg-[#212023] flex justify-center items-start place-items-center w-full px-8 py-4 min-h-screen">
            <div className="flex flex-col w-full lg:max-w-[900px]">
               <SkeletonTheme>
                  {/* Header */}
                  <header className="space-y-4 w-full ">
                     <h1 className="flex justify-center text-lg font-bold">
                        POKEMON LIST
                     </h1>
                     {/* Search Bar */}
                     <SearchBar
                        handleSetSearchQuery={handleSetSearchQuery}
                        searchQuery={searchQuery}
                     />
                  </header>
                  {/* Body */}
                  <Suspense
                     fallback={
                        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8 w-full  ">
                           <SkeletonLoading amount={20} />
                        </div>
                     }
                  >
                     <div className="w-full ">
                        <InfiniteScroll
                           dataLength={pokemonList.length}
                           next={handleNextPage}
                           hasMore={!!nextPage}
                           loader={''}
                           scrollThreshold={1}
                        >
                           <div className="flex justify-center w-full mt-8">
                              <PokemonList
                                 pokemon={pokemonList}
                                 loading={loading}
                                 error={error}
                              />
                           </div>
                        </InfiniteScroll>
                     </div>
                  </Suspense>
               </SkeletonTheme>
            </div>
         </div>
      </>
   );
}

export default App;
