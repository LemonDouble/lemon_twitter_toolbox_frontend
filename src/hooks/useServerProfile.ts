import axios from "axios"
import { useQuery } from "react-query"

export type UserProfile = {
    banner_image_url: string;
    profile_image_url : string;
    screen_name : string;
    screen_nickname : string;
    user_bio: string;
    follower_count : number;
    following_count : number;
}

export default function useServerProfile(isLogin : boolean){
    return useQuery<UserProfile, Error>('profileURL', async ():Promise<UserProfile> =>
     (await axios.get('/api/twitter/user-profile')).data, {enabled: isLogin}
   )
}