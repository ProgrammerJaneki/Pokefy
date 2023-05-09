import { Icon } from '@iconify/react/dist/iconify.js';
import { ChangeEvent } from 'react';

interface SearchBarModel {
   handleSetSearchQuery: (event: ChangeEvent<HTMLInputElement>) => void;
   searchQuery: string;
}

const SearchBar = ({ handleSetSearchQuery, searchQuery }: SearchBarModel) => {
   // console.log('SEARCH: ', searchQuery);
   return (
      <>
         <div className="bg-[#29292b] flex items-center p-3 rounded-md text-sm gap-x-2 text-[#dedede]  w-full">
            <Icon icon="tabler:search" color="" width="18" height="18" />
            <input
               className="bg-transparent w-full focus:outline-none"
               type="text"
               placeholder="Search"
               value={searchQuery}
               onChange={handleSetSearchQuery}
            />
         </div>
      </>
   );
};
export default SearchBar;
