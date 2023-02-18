import { TABLES } from '@common/constants/tables';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
   const supabase = createServerSupabaseClient({ req, res });
   const { body } = req;
   const { ball_id, user_id } = body;

   const response = await supabase.from(TABLES.USER_BALLS).insert({ ball_id, user_id });

   if (response.status !== 201) res.status(500).send(response);

   res.status(201).send(response.data);
};
