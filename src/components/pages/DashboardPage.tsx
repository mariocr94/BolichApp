import useGames from '@hooks/useGames';
import { IGames } from '@models/games';
import useTranslation from 'next-translate/useTranslation';

export interface DashboardPageProps {
   games: IGames[];
}

const DashboardPage = ({ games }: DashboardPageProps) => {
   const { t } = useTranslation('common');
   const { averageScore } = useGames(games);
   return (
      <div className="container mx-auto flex h-to-fit flex-col items-center gap-4 p-4">
         <h1>
            {t('average')}: {averageScore}
         </h1>
      </div>
   );
};

export default DashboardPage;
