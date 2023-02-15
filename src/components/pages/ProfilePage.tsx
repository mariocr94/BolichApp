import { Button, Input, Radio } from '@material-tailwind/react';
import { UserProfile } from '@models/profile';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';

export interface ProfilePageProps {
   profile: UserProfile;
}

const ProfilePage = ({ profile }: ProfilePageProps) => {
   const formRef = useRef(null);
   const defaultValues = {
      username: profile.username,
      full_name: profile.full_name,
      right_handed:
         profile.right_handed === true
            ? 'Right handed'
            : profile.right_handed !== null && 'Left handed',
      one_handed:
         profile.one_handed === true ? 'One handed' : profile.one_handed !== null && 'Two handed',
      kmh: profile.kmh,
      speed_km: profile.speed_km === true ? 'kph' : profile.speed_km !== null && 'mph',
      rpm: profile.rpm,
   };

   const {
      register,
      setValue,
      handleSubmit,
      formState: { errors, dirtyFields },
   } = useForm({
      defaultValues,
   });

   const onSubmit = (userProfile) => {
      console.log(userProfile);
   };

   useEffect(() => {
      setValue('username', profile.username);
      setValue('full_name', profile.full_name);
   }, []);

   return (
      <div className="container mx-auto flex h-to-fit flex-col items-start gap-4 p-4">
         <div className="mb-4 w-full border-b border-b-main-1 pb-2">
            <h1>Profile</h1>
            <h3>Update your personal details here.</h3>
         </div>
         <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
               <Input id="username" variant="static" label="Username" {...register('username')} />
               <Input id="name" variant="static" label="Full Name" {...register('full_name')} />
               <div className="flex gap-4">
                  <Radio
                     id="right-handed"
                     name="hand"
                     label="Right handed"
                     value="Right handed"
                     color="purple"
                     {...register('right_handed')}
                  />
                  <Radio
                     id="left-handed"
                     name="hand"
                     label="Left handed"
                     value="Left handed"
                     color="purple"
                     {...register('right_handed')}
                  />
               </div>
               <div className="flex gap-[23px]">
                  <Radio
                     id="one-handed"
                     name="style"
                     label="One handed"
                     value="One handed"
                     color="purple"
                     {...register('one_handed')}
                  />
                  <Radio
                     id="two-handed"
                     name="style"
                     label="Two handed"
                     value="Two handed"
                     color="purple"
                     {...register('one_handed')}
                  />
               </div>
               <Input
                  id="kmh"
                  className="w-50 border-0"
                  type="float"
                  label="Speed"
                  containerProps={{ className: 'w-24' }}
                  {...register('kmh')}
               />
               <div className="flex gap-[23px]">
                  <Radio
                     id="speed_km"
                     name="speed_km"
                     label="KM/H"
                     value="kph"
                     color="purple"
                     {...register('speed_km')}
                  />
                  <Radio
                     id="speed_m"
                     name="speed_km"
                     label="M/H"
                     value="mph"
                     color="purple"
                     {...register('speed_km')}
                  />
               </div>
               <Input
                  id="rpm"
                  className="w-50 border-0"
                  type="numeric"
                  label="RPM"
                  containerProps={{ className: 'w-24' }}
                  {...register('rpm')}
               />
            </div>
            <div className="mt-4 flex gap-2">
               <Button className="w-24 bg-gray-400 !py-1">Cancel</Button>
               <Button type="submit" className="w-24 bg-main-3">
                  Save
               </Button>
            </div>
         </form>
      </div>
   );
};

export default ProfilePage;
