import ComboBox from '@components/common/ComboBox';
import Pagination from '@components/common/Pagination';
import { RefreshIcon } from '@heroicons/react/solid';
import useArsenal from '@hooks/useArsenal';
import useBalls from '@hooks/useBalls';
import { Button } from '@material-tailwind/react';
import { IBalls } from '@models/balls';
import { IUserBall } from '@models/userBalls';
import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';

export interface ArsenalPageProps {
   arsenal: IUserBall[];
}

const PAGE_SIZE = 10;

const ArsenalPage = ({ arsenal }: ArsenalPageProps) => {
   const [ball, setBall] = useState<IBalls | null>(null);
   const { t } = useTranslation('arsenal');
   const {
      userBalls,
      addBall,
      isPosting,
      deleteBall,
      startIndex,
      endIndex,
      numberOfRecords,
      setStartIndex,
      setEndIndex,
   } = useArsenal(arsenal, PAGE_SIZE);

   const { balls, query, setQuery } = useBalls();

   const useComboBoxValue = (ball: IBalls) => {
      setBall(ball);
   };

   return (
      <div className="container mx-auto flex h-to-fit flex-col items-center gap-4 p-4">
         {userBalls !== null ? (
            <div className="flex flex-col items-center justify-center gap-4">
               <h1>{t('arsenal')}:</h1>
               <div className="rounded-xl border-2 border-main-3">
                  <table className="min-w-[768px] divide-x divide-y">
                     <thead>
                        <tr className="">
                           <th className="px-4 py-2">{t('brand')}</th>
                           <th className="px-4 py-2">{t('name')}</th>
                           <th className="px-4 py-2">{t('coverstock')}</th>
                           <th className="px-4 py-2">{t('delete')}</th>
                        </tr>
                     </thead>
                     <tbody className="rounded-lg">
                        {userBalls.slice(startIndex, endIndex + 1).map((userBall) => {
                           return (
                              <tr
                                 key={`${userBall.id}:${userBall.ballname}`}
                                 className="border-t-2 border-main-1"
                              >
                                 <td>{userBall.brandname}</td>
                                 <td>{userBall.ballname}</td>
                                 <td>{userBall.covername}</td>
                                 <td className="text-red-500">
                                    {/* <button>X</button> */}
                                    <button onClick={() => deleteBall(userBall.id)}>X</button>
                                 </td>
                              </tr>
                           );
                        })}
                     </tbody>
                  </table>
               </div>
               <Pagination
                  numberOfRecords={numberOfRecords}
                  setStartIndex={setStartIndex}
                  setEndIndex={setEndIndex}
                  pageSize={PAGE_SIZE}
               />
            </div>
         ) : (
            <h1>{t('addNewBall')}</h1>
         )}

         <div className="mt-4 flex flex-col items-center gap-2 md:flex-row">
            <ComboBox
               balls={balls}
               query={query}
               setQuery={setQuery}
               placeholder={t('addPlaceholder') as string}
               useValue={useComboBoxValue}
            />
            <Button
               className="w-40 bg-main-3"
               onClick={() => {
                  addBall(ball.id);
               }}
            >
               {isPosting ? (
                  <div className="flex items-center justify-center">
                     <RefreshIcon className="h-4 w-4 fill-white" />
                  </div>
               ) : (
                  t('addBall')
               )}
            </Button>
         </div>
      </div>
   );
};

export default ArsenalPage;
