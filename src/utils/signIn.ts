import { SupabaseClient } from '@supabase/supabase-js';

export const signInWithGoogle = async (supabaseClient: SupabaseClient) => {
   const { data, error } = await supabaseClient.auth.signInWithOAuth({ provider: 'google' });
   if (error) console.log(error);
};

export const signInWithFacebook = async (supabaseClient: SupabaseClient) => {
   const { data, error } = await supabaseClient.auth.signInWithOAuth({ provider: 'facebook' });
   if (error) console.log(error);
};
