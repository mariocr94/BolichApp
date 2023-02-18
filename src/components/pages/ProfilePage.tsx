import { RefreshIcon } from '@heroicons/react/solid';
import useProfile from '@hooks/useProfile';
import { Button, Input, Radio } from '@material-tailwind/react';
import { UserProfile } from '@models/profile';
import useTranslation from 'next-translate/useTranslation';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';

export interface ProfilePageProps {
   profile: UserProfile;
}

const ProfilePage = ({ profile }: ProfilePageProps) => {
   const { t } = useTranslation('profile');
   const formRef = useRef(null);
   const { defaultValues, updateProfile, isUpdating } = useProfile(profile);

   const { register, handleSubmit } = useForm({
      defaultValues,
   });

   const onSubmit = (userProfile) => {
      updateProfile(userProfile);
   };

   return (
      <div className="container mx-auto flex h-to-fit flex-col items-start gap-4 p-4">
         <div className="mb-4 w-full border-b border-b-main-1 pb-2">
            <h1>{t('profile')}</h1>
            <h3 className="text-main-2">{t('description')}</h3>
         </div>
         <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
               <div className="space-y-6">
                  <Input
                     id="username"
                     variant="static"
                     label={t('username')}
                     {...register('username')}
                  />
                  <Input
                     id="name"
                     variant="static"
                     label={t('fullName')}
                     {...register('full_name')}
                  />
                  <div className="flex gap-4">
                     <Radio
                        id="right-handed"
                        name="hand"
                        label={t('rightHanded')}
                        value="Right handed"
                        color="red"
                        {...register('right_handed')}
                     />
                     <Radio
                        id="left-handed"
                        name="hand"
                        label={t('leftHanded')}
                        value="Left handed"
                        color="red"
                        {...register('right_handed')}
                     />
                  </div>
                  <div className="flex gap-[23px]">
                     <Radio
                        id="one-handed"
                        name="style"
                        label={t('oneHanded')}
                        value="One handed"
                        color="red"
                        {...register('one_handed')}
                     />
                     <Radio
                        id="two-handed"
                        name="style"
                        label={t('twoHanded')}
                        value="Two handed"
                        color="red"
                        {...register('one_handed')}
                     />
                  </div>
               </div>
               <div className="space-y-6">
                  <Input
                     id="kmh"
                     className="w-50 border-0 text-main-2"
                     type="float"
                     label={t('speed')}
                     containerProps={{ className: 'w-24' }}
                     {...register('speed')}
                  />
                  <div className="flex gap-[23px]">
                     <Radio
                        id="speed_km"
                        name="speed_km"
                        label="KM/H"
                        value="kph"
                        color="red"
                        {...register('isKmh')}
                     />
                     <Radio
                        id="speed_m"
                        name="speed_km"
                        label="M/H"
                        value="mph"
                        color="red"
                        {...register('isKmh')}
                     />
                  </div>
                  <Input
                     id="rpm"
                     className="w-50 border-0 text-main-2"
                     type="numeric"
                     label="RPM"
                     containerProps={{ className: 'w-24' }}
                     {...register('rpm')}
                  />
               </div>
            </div>
            <div className="mt-4 flex gap-2">
               <Button className="w-28 bg-gray-400 !py-1 text-center">{t('cancel')}</Button>
               <Button type="submit" className="w-28 bg-main-1" disabled={isUpdating}>
                  {isUpdating ? (
                     <div className="flex items-center justify-center">
                        <RefreshIcon className="h-4 w-4 fill-white" />
                     </div>
                  ) : (
                     t('save')
                  )}
               </Button>
            </div>
         </form>
      </div>
   );
};

export default ProfilePage;
