import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { Button } from '@material-tailwind/react';
import { useEffect } from 'react';
import { usePagination } from 'react-use-pagination';
import PageButtons from './PageButtons';

interface PaginationProps {
   numberOfRecords: number;
   setStartIndex: Function;
   setEndIndex: Function;
   pageSize?: number;
}

const Pagination = ({
   numberOfRecords,
   setStartIndex,
   setEndIndex,
   pageSize = 10,
}: PaginationProps) => {
   const {
      currentPage,
      setNextPage,
      setPreviousPage,
      totalPages,
      startIndex,
      endIndex,
      setPage,
      nextEnabled,
      previousEnabled,
   } = usePagination({
      totalItems: numberOfRecords,
      initialPageSize: pageSize,
   });

   useEffect(() => {
      setStartIndex(startIndex);
      setEndIndex(endIndex);
   }, [startIndex, endIndex]);

   return (
      <div className="flex items-center">
         <Button
            className={`mr-2 ${previousEnabled ? 'smallIconButton' : 'disabledSmallIconButton'}`}
            onClick={() => {
               setPreviousPage();
            }}
            disabled={!previousEnabled}
         >
            <ChevronLeftIcon
               className={`h-5 w-5 ${previousEnabled ? 'fill-main-2' : 'fill-gray-400'}`}
            />
         </Button>
         <PageButtons totalPages={totalPages} currentPage={currentPage} setPage={setPage} />
         <Button
            variant="filled"
            className={`mr-2 ${nextEnabled ? 'smallIconButton' : 'disabledSmallIconButton'}`}
            onClick={() => {
               setNextPage();
            }}
            disabled={!nextEnabled}
         >
            <ChevronRightIcon
               className={`h-5 w-5 ${nextEnabled ? 'fill-main-2' : 'fill-gray-400'}`}
            />
         </Button>
      </div>
   );
};

export default Pagination;
