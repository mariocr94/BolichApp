import { UserProfile } from '@models/profile';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useState } from 'react';

const useProfile = (profile: UserProfile) => {
   const [isUpdating, setIsUpdating] = useState(false);
   const supabaseClient = useSupabaseClient();

   const defaultValues = {
      username: profile.username,
      full_name: profile.full_name,
      right_handed:
         profile.right_handed === true
            ? 'Right handed'
            : profile.right_handed !== null && 'Left handed',
      one_handed:
         profile.one_handed === true ? 'One handed' : profile.one_handed !== null && 'Two handed',
      speed: profile.speed,
      isKmh: profile.isKmh === true ? 'kph' : profile.isKmh !== null && 'mph',
      rpm: profile.rpm,
   };

   const updateProfile = async (profileInfo) => {
      setIsUpdating(true);
      const updateBody: UserProfile = {
         ...profile,
         updated_at: new Date(),
         username: profileInfo.username,
         full_name: profileInfo.full_name,
         right_handed:
            profileInfo.right_handed === 'Right handed'
               ? true
               : profileInfo.right_handed === 'Left handed'
               ? false
               : null,
         one_handed:
            profileInfo.one_handed === 'One handed'
               ? true
               : profileInfo.one_handed === 'Two handed'
               ? false
               : null,
         speed: profileInfo.speed,
         isKmh: profileInfo.isKmh === 'kph' ? true : profileInfo.isKmh === 'mph' ? false : null,
         rpm: profileInfo.rpm,
      };

      try {
         let { error } = await supabaseClient.from('profiles').upsert(updateBody);
         if (error) {
            throw error;
         }
         setIsUpdating(false);
      } catch (error) {
         alert(error.message);
         setIsUpdating(false);
      }
   };

   return {
      defaultValues,
      updateProfile,
      isUpdating,
   };
};

export default useProfile;
