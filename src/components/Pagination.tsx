import { Icon } from '@iconify/react';

interface PaginationProps {
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
