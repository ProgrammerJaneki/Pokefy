import { useState, useEffect, Suspense, ChangeEvent, useCallback } from 'react';
import PokemonList from './components/PokemonList';
import axios from 'axios';
import Pagination from './components/Pagination';
import { PokemonDataModel } from './components/interface/PokemonDataModel';
import SearchBar from './components/SearchBar';

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

   const getPokemonList = async () => {
      try {
         setLoading(true);
         const pokemonListData = await axios.get(currentPage);
         const { results, previous, next } = pokemonListData.data;
         setNextPage(next);
         setPrevPage(previous);
         const pokemonDataList = await Promise.all(
            results.map(async (result: { url: string }) => {
               const { data } = await axios.get<PokemonDataModel>(result.url); // I am getting the exact data from this url
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
         setLoading(false);
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      // setLoading(true);
      // let cancel: any;
      // axios
      //    .get(currentPage, {
      //       cancelToken: new axios.CancelToken((c) => (cancel = c)),
      //    })
      //    .then((response) => {
      //       setLoading(false);
      //       setNextPage(response.data.next);
      //       setPrevPage(response.data.previous);
      //       setPokemonList(
      //          response.data.results.map((poke: { name: string }) => poke.name)
      //       );
      //    })
      //    .catch((error) => {
      //       try {
      //          if (axios.isCancel(error)) {
      //             console.log('Request Canceled', error.message);
      //          } else {
      //             setError('Error fetching Pokemon List');
      //             console.log(error);
      //          }
      //       } catch (e) {
      //          console.log(e);
      //       }
      //    });
      // return () => {
      //    cancel();
      // };
      getPokemonList();
      console.log(nextPage);
   }, [currentPage]);

   // Pagination | Handlers
   const handleSetSearchQuery = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
         console.log('hey');
         setSearchQuery(event.target.value);
      },
      []
   );
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
