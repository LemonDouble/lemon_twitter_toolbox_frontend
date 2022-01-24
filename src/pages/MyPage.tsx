import ErrorNoticeCard from "../components/ErrorNoticeCard";
import UserShowCard from "../components/UserShowCard";
import useServerProfile from "../hooks/useServerProfile";


export default function MyPage(){

    const { isLoading, error, data } = useServerProfile();


    if(isLoading) return <>Loading..</>
    
    if(error){
        return <ErrorNoticeCard />
    }

    console.log(`data = ${data}`);
    console.log(`error = ${error}`);

    if(data){
        return <div>
        <UserShowCard 
        profileImageUrlPath={data.profile_image_url}
        UserName={data?.screen_name}
        UserBio={data?.user_bio}
        FollowingCount={10}
        FollowerCount={100} />
    </div>
    }

    return <ErrorNoticeCard />
}