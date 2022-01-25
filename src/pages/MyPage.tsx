import { Box, Card, Divider, Grid, Typography } from "@mui/material";
import ErrorNoticeCard from "../components/ErrorNoticeCard";
import MenuBarWithoutNotification from "../components/MenuBarWithoutNotification";
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
            <Box sx ={{
                width: "100vw",
                height: "100vh"
            }}>
            <MenuBarWithoutNotification></MenuBarWithoutNotification>
            <Box sx = {{height:"20px"}}></Box>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <Typography variant="h5"> Current Login With : </Typography>
                    <Divider />
                    <UserShowCard 
                    profileImageUrlPath={data.profile_image_url}
                    UserName={data?.screen_name}
                    UserBio={data?.user_bio}
                    FollowingCount={10}
                    FollowerCount={100} />
                </Grid>
                <Grid item xs = {4}>

                </Grid>
            </Grid>
            </Box>
        )
    }

    return <ErrorNoticeCard />
}