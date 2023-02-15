import { UserProfile } from '@models/profile';

export interface ProfilePageProps {
   profile: UserProfile;
}

const ProfilePage = ({ profile }: ProfilePageProps) => {
   // console.log(profile);
   return (
      <div className="container mx-auto flex h-to-fit flex-col items-center gap-4 p-4">Profile</div>
   );
};

export default ProfilePage;
