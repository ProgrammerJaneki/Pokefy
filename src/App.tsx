import { useState, useEffect, useMemo } from 'react';
import PokemonList from './components/PokemonList';
import axios from 'axios';

function App() {
   const [pokemonList, setPokemonList] = useState<string[]>([]);
   const [loading, setLoading] = useState<boolean>(false);
   const [error, setError] = useState<string>('');
   const [currentPage, setCurrentPage] = useState<string>(
      `https://pokeapi.co/api/v2/pokemon`
   );
   const [nextPage, setNextPage] = useState<string>('');
   const [prevPage, setPrevPage] = useState<string>('');

   useEffect(() => {
      setLoading(true);
      let cancel: any;
      axios
         .get(currentPage, {
            cancelToken: new axios.CancelToken((c) => (cancel = c)),
         })
         .then((response) => {
            setLoading(false);
            setNextPage(response.data.next);
            setPrevPage(response.data.previous);
            setPokemonList(
               response.data.results.map((poke: { name: string }) => poke.name)
            );
         })
         .catch((error) => {
            try {
               if (axios.isCancel(error)) {
                  console.log('Request Canceled', error.message);
               } else {
                  setError('Error fetching Pokemon List');
                  console.log(error);
               }
            } catch (e) {
               console.log(e);
            }
         });
      return () => {
         cancel();
      };
   }, [currentPage]);

   // Pagination
   const handlePrevPage = () => {
      setCurrentPage(prevPage);
   };
   const handleNextPage = () => {
      setCurrentPage(nextPage);
   };

   return (
      <>
         <div className="py-4 px-8">
            {/* Header */}
            <h1 className="font-bold text-lg flex justify-center">
               POKEMON LIST
            </h1>
            {/* Body */}
            <div className="flex justify-center mt-8 w-full">
               <PokemonList
                  pokemonList={pokemonList}
                  loading={loading}
                  error={error}
               />
            </div>
            <button className="" onClick={handlePrevPage}>
               Previous Page
            </button>
            <button className="" onClick={handleNextPage}>
               Next Page
            </button>
         </div>
      </>
   );
}

export default App;
