import { MONTH_DAY_YEAR } from '@common/constants/timeFormat';
import Pagination from '@components/common/Pagination';
import useGames from '@hooks/useGames';
import { IGames } from '@models/games';
import moment from 'moment';
import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';

export interface GamesPageProps {
   games: IGames[];
}

const PAGE_SIZE = 5;

const GamesPage = ({ games: serverGames }: GamesPageProps) => {
   const { t } = useTranslation('games');
   const [score, setScore] = useState('');

   let {
      postGame,
      isPosting,
      deleteGame,
      games,
      startIndex,
      setStartIndex,
      endIndex,
      setEndIndex,
      numberOfRecords,
      averageScore,
   } = useGames(serverGames, PAGE_SIZE);

   const handleScoreChange = (e: React.FormEvent<HTMLInputElement>) => {
      setScore(e.currentTarget.value);
   };

   const handleKeyDown = (event: any) => {
      if (event.key === 'Enter') {
         if (parseInt(score) > 300) {
            alert('It is not possible to score more than 300.');
            return;
         }
         postGame(score);
         setScore('');
      }
   };

   return (
      <div className="container mx-auto flex h-to-fit flex-col items-center gap-4 p-4">
         <h1>
            {t('average')}: {averageScore}
         </h1>
         {games !== null ? (
            <div className="flex flex-col items-center justify-center">
               <h1>{t('allPreviousScores')}:</h1>
               <div className="rounded-xl border-2 border-main-3">
                  <table className="w-96 divide-x divide-y">
                     <thead>
                        <tr className="">
                           <th className="px-4 py-2">{t('date')}</th>
                           <th className="px-4 py-2">{t('score')}</th>
                           <th className="px-4 py-2">{t('delete')}</th>
                        </tr>
                     </thead>
                     <tbody className="rounded-lg">
                        {games.slice(startIndex, endIndex + 1).map((game) => {
                           return (
                              <tr key={game.id} className="border-t-2 border-main-1">
                                 <td>{moment(game.inserted_at).format(MONTH_DAY_YEAR)}</td>
                                 <td>{game.score}</td>
                                 <td className="text-red-500">
                                    <button onClick={() => deleteGame(game.id)}>X</button>
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
            <h1>{t('addNewScore')}</h1>
         )}

         <div className="mt-4 flex flex-col items-center gap-2 md:flex-row">
            <h1>{t('newScore')}: </h1>
            {isPosting ? (
               <h2>{t('addingScore')}</h2>
            ) : (
               <input
                  className="appearance-none rounded-lg px-4 py-2 shadow-md focus:outline-main-3"
                  type="number"
                  placeholder={t('newScorePlaceholder')}
                  value={score}
                  onChange={handleScoreChange}
                  onKeyDown={handleKeyDown}
               />
            )}
         </div>
      </div>
   );
};

export default GamesPage;
