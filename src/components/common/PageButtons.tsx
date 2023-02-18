import { Button } from '@material-tailwind/react';

export interface PageButtonsProps {
   totalPages: number;
   currentPage: number;
   setPage: Function;
}

const PageButtons = ({ totalPages, currentPage, setPage }: PageButtonsProps) => {
   const pages = Array.from(Array(totalPages).keys());

   if (totalPages <= 5)
      return (
         <div>
            {pages.map((page: number) => {
               return (
                  <Button
                     key={page}
                     className={`smallButton m-2 font-normal text-main-2 ${
                        currentPage == page ? 'bg-main-2 text-main-1 hover:bg-main-2' : 'bg-main-3'
                     }`}
                     onClick={() => {
                        setPage(page);
                     }}
                  >
                     {page + 1}
                  </Button>
               );
            })}
         </div>
      );

   if (currentPage <= 3)
      return (
         <div className="flex">
            {pages.slice(0, 5).map((page: number) => {
               return (
                  <Button
                     key={page}
                     className={`smallButton m-2 font-normal text-main-3 ${
                        currentPage == page ? 'bg-cm-blue-1 text-white' : ''
                     }`}
                     onClick={() => {
                        setPage(page);
                     }}
                  >
                     {page + 1}
                  </Button>
               );
            })}
            <div className="p-1 text-main-3">...</div>
            <Button
               className={`smallButton m-2 font-normal text-main-3 ${
                  currentPage == totalPages ? 'bg-cm-blue-1 text-white' : ''
               }`}
               onClick={() => {
                  setPage(totalPages);
               }}
            >
               {totalPages}
            </Button>
         </div>
      );

   if (currentPage >= totalPages - 4)
      return (
         <div className="flex">
            <Button
               className="smallButton m-2 font-normal text-main-3"
               onClick={() => {
                  setPage(0);
               }}
            >
               1
            </Button>
            <div className="p-1 text-main-3">...</div>
            {pages.slice(totalPages - 5, totalPages).map((page: number) => {
               return (
                  <Button
                     key={page}
                     className={`smallButton m-2 font-normal text-main-3 ${
                        currentPage == page ? 'bg-cm-blue-1 text-white' : ''
                     }`}
                     onClick={() => {
                        setPage(page);
                     }}
                  >
                     {page + 1}
                  </Button>
               );
            })}
         </div>
      );

   return (
      <div className="flex">
         <Button
            className="smallButton m-2 font-normal text-main-3"
            onClick={() => {
               setPage(0);
            }}
         >
            1
         </Button>
         <div className="p-1 text-main-3">...</div>
         {pages.slice(currentPage - 1, currentPage + 2).map((page: number) => {
            return (
               <Button
                  key={page}
                  className={`smallButton m-2 font-normal text-main-3 duration-500 ${
                     currentPage == page ? 'bg-cm-blue-1 text-white' : ''
                  }`}
                  onClick={() => {
                     setPage(page);
                  }}
               >
                  {page + 1}
               </Button>
            );
         })}
         <div className="p-1 text-main-3">...</div>
         <Button
            className={`smallButton m-2 font-normal text-main-3 ${
               currentPage == totalPages ? 'bg-cm-blue-1 text-white' : ''
            }`}
            onClick={() => {
               setPage(totalPages);
            }}
         >
            {totalPages}
         </Button>
      </div>
   );
};

export default PageButtons;
