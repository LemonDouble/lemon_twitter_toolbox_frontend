import { Box } from "@mui/material";
import ErrorNoticeCard from "../components/ErrorNoticeCard";
import MenuBar from "../components/MenuBar";
import UserShowCard from "../components/UserShowCard";
import useServerProfile from "../hooks/useServerProfile";


export default function MyPage(){

    const { isLoading, error, data } = useServerProfile();


    if(isLoading) return <>Loading..</>
    
    if(error){
        return <ErrorNoticeCard />
    }

    if(data){
        return (
        <Box>
            <MenuBar></MenuBar>
            <UserShowCard 
            profileImageUrlPath={data.profile_image_url}
            UserName={data?.screen_name}
            UserBio={data?.user_bio}
            FollowingCount={10}
            FollowerCount={100} />
        </Box>)
    }

    return <ErrorNoticeCard />
}