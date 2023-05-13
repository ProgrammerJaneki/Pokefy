import React from 'react';
import { Icon } from '@iconify/react';

interface PaginationProps {
   // handlePrevPage?: (() => void) | null;
   // handleNextPage?: (() => void) | null;
   handlePrevPage: () => void;
   handleNextPage: () => void;
   nextPage: string;
   pageNumber: number;
}

const paginationButton = {
   activePaginationButtonStyle:
      'bg-transparent hover:bg-[#1f2026] text-[#FFFFFF] py-2 px-4 rounded-sm transition-all duration-150 ease-linear cursor-pointer',
   disabledPaginationButtonStyle:
      'bg-transparent  text-[#FFFFFF] py-2 px-4 rounded-sm transition-all duration-150 ease-linear',
};

const Pagination = ({
   handlePrevPage,
   handleNextPage,
   pageNumber,
   nextPage,
}: PaginationProps) => {
   return (
      <div className="flex justify-center mt-8 ">
         <div className="flex bg-[#16171d] rounded-sm">
            <button
               className={`${
                  pageNumber === 1
                     ? paginationButton.disabledPaginationButtonStyle
                     : paginationButton.activePaginationButtonStyle
               }`}
               onClick={handlePrevPage}
               disabled={pageNumber === 1}
            >
               <Icon
                  icon="ic:sharp-keyboard-arrow-left"
                  color="#dedede"
                  width="24"
                  height="24"
               />
            </button>
            <div className="px-4 py-2 bg-transparent">{pageNumber}</div>
            <button
               className={`${
                  !nextPage
                     ? paginationButton.disabledPaginationButtonStyle
                     : paginationButton.activePaginationButtonStyle
               }`}
               onClick={handleNextPage}
               disabled={!nextPage}
            >
               <Icon
                  icon="ic:sharp-keyboard-arrow-right"
                  color="#dedede"
                  width="24"
                  height="24"
               />
            </button>
         </div>
      </div>
   );
};

export default Pagination;

// import React, { useState, useEffect, lazy, Suspense } from 'react';
// import axios from 'axios';

// interface Pokemon {
//   name: string;
//   url: string;
// }

// const PokemonList = lazy(() => import('./PokemonList'));

// function App() {
//   const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [page, setPage] = useState(1);

//   useEffect(() => {
//     setLoading(true);
//     setError('');

//     axios
//       .get(`https://pokeapi.co/api/v2/pokemon/?offset=${(page - 1) * 20}&limit=20`)
//       .then(response => {
//         setPokemonList(response.data.results);
//         setLoading(false);
//       })
//       .catch(error => {
//         setError('Error fetching Pokemon. Please try again later.');
//         setLoading(false);
//       });
//   }, [page]);

//   const handlePrevPage = () => {
//     if (page > 1) {
//       setPage(page - 1);
//     }
//   };

//   const handleNextPage = () => {
//     setPage(page + 1);
//   };

//   return (
//     <div>
//       <h1>Pokemon List</h1>

//       <Suspense fallback={<div>Loading...</div>}>
//         <PokemonList pokemonList={pokemonList} error={error} loading={loading} />
//       </Suspense>

//       {!loading && !error && (
//         <div>
//           <button onClick={handlePrevPage} disabled={page === 1}>
//             Previous Page
//           </button>
//           <button onClick={handleNextPage}>Next Page</button>
//         </div>
//       )}
//     </div>
//   );
// }

// interface PokemonListProps {
//   pokemonList: Pokemon[];
//   loading: boolean;
//   error: string;
// }

// function PokemonList({ pokemonList, loading, error }: PokemonListProps) {
//   return (
//     <div>
//       {loading && <div>Loading...</div>}
//       {error && <div>{error}</div>}
//       {!loading && !error && (
//         <ul>
//           {pokemonList.map(pokemon => (
//             <li key={pokemon.name}>{pokemon.name}</li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

// export default App;
