export interface UserProfile {
   id: string;
   updated_at: string;
   username: string;
   full_name: string;
   avatar_url: string;
   right_handed: boolean;
   one_handed: boolean;
   bowling_profile: BowlingProfile;
   kmh: number;
   speed_km: boolean;
   rpm: number;
}

export enum BowlingProfile {
   CASUAL = 'Casual',
   BEGINNER = 'Beginner',
   LEAGUE = 'League Bowler',
   PRO = 'Pro',
}
