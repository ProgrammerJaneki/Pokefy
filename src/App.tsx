import { useState, useEffect, Suspense, ChangeEvent } from 'react';
import PokemonList from './components/PokemonList';
import axios from 'axios';
import Pagination from './components/Pagination';
import { PokemonDataModel } from './components/interface/PokemonDataModel';
import SearchBar from './components/SearchBar';
import useDebounce from './components/utilities/useDebounce';

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
      // console.log('S:', searchQuery);
      setSearchQuery(event.target.value);
   };

   const getPokemonList = async () => {
      setError('');
      try {
         setLoading(true);
         const searchUrl = debouncedSearchQuery
            ? `https://pokeapi.co/api/v2/pokemon/${searchQuery}`
            : currentPage;
         const pokemonListData = await axios.get(searchUrl);
         if (Array.isArray(pokemonListData.data.results)) {
            const { results, previous, next } = pokemonListData.data;
            setNextPage(next);
            setPrevPage(previous);
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
                  // console.log(pokemonData.name);
                  return pokemonData;
               })
            );
            setPokemonList(pokemonDataList);
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
            setPokemonList([pokemonData]);
         }
         setLoading(false);
      } catch (err: any) {
         if (err.response.data === 'Not Found') {
            setError('No results');
            console.log('bug');
         } else {
            setError('');
         }
         setLoading(false);
         // console.log(err);
         // console.log('ERROR: ', err.response.data);
      }
   };

   useEffect(() => {
      getPokemonList();
      // console.log('Next: ',nextPage);
      // console.log('Error:', error);
   }, [debouncedSearchQuery, currentPage]);
   // }, [debouncedSearchQuery ? debouncedSearchQuery : currentPage]);

   // Pagination | Handlers
   const handlePrevPage = () => {
      setCurrentPage(prevPage);
      setPageNumber(pageNumber - 1);
   };
   const handleNextPage = () => {
      setCurrentPage(nextPage);
      setPageNumber(pageNumber + 1);
   };

   return (
      <>
         <div className="bg-[#212023] px-8 py-4 min-h-screen">
            {/* Header */}
            <div className="space-y-4">
               <h1 className="flex justify-center text-lg font-bold">
                  POKEMON LIST
               </h1>
               {/* Search Bar */}
               <SearchBar
                  handleSetSearchQuery={handleSetSearchQuery}
                  searchQuery={searchQuery}
               />
            </div>
            {/* Body */}
            <Suspense fallback={<div>Loading....</div>}>
               <div className="flex justify-center w-full mt-8">
                  <PokemonList
                     pokemon={pokemonList}
                     loading={loading}
                     error={error}
                  />
               </div>
            </Suspense>

            <Pagination
               handlePrevPage={handlePrevPage}
               handleNextPage={handleNextPage}
               pageNumber={pageNumber}
               nextPage={nextPage}
            />
         </div>
      </>
   );
}

export default App;
