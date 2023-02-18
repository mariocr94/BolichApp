import Card from '@components/common/cards/Card';
import ComboBox from '@components/common/ComboBox';
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
   const [resetQuery, setResetQuery] = useState(0);
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

   const handleAddBallButton = (ballId: number) => {
      addBall(ballId);
      setResetQuery((resetQuery) => resetQuery + 1);
   };

   return (
      <div className="container flex h-to-fit flex-col items-center gap-4 p-4">
         <div className="mt-4 mb-10 flex flex-col items-center gap-2 md:flex-row md:items-center md:justify-center">
            <ComboBox
               data={balls}
               query={query}
               setQuery={setQuery}
               placeholder={t('addPlaceholder') as string}
               useValue={useComboBoxValue}
               resetQuery={resetQuery}
            />
            <Button
               className="w-40 bg-main-1 shadow-xl"
               onClick={() => {
                  handleAddBallButton(ball.id);
               }}
            >
               {isPosting ? (
                  <div className="flex items-center justify-center">
                     <RefreshIcon className="h-4 w-4 animate-reverse-spin fill-white" />
                  </div>
               ) : (
                  t('addBall')
               )}
            </Button>
         </div>
         {userBalls !== null ? (
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-10 md:justify-start">
               {userBalls.map((ball) => (
                  <Card
                     key={ball.id}
                     id={ball.id}
                     title={ball.ballname}
                     description={ball.covername}
                     leftFoot={ball.brandname}
                     onDelete={deleteBall}
                  />
               ))}
            </div>
         ) : (
            <h1>{t('addNewBall')}</h1>
         )}
      </div>
   );
};

export default ArsenalPage;
