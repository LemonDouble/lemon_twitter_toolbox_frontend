import { Box, Divider, Grid, Paper, Typography } from "@mui/material";
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
            <Grid sx ={{
                width: "100vw",
                height: "100vh"
            }}>
                <MenuBarWithoutNotification></MenuBarWithoutNotification>
                <Box sx = {{height:"20px"}}></Box>
                <Grid container spacing={3} direction="row" 
                sx={{
                    height: "275px",
                    justifyContent : "center",
                }}>
                    <Grid item lg ={4} md ={4} sm ={10} xs ={10}
                    sx={{height:"100%"}}>
                        <Grid container direction="column" justifyContent="space-between" sx={{
                            maxWidth: "500px",height:"100%"}}>
                            <Grid item>
                                <Typography variant="h5"> 로그인 중인 사용자 : </Typography>
                                <Divider />
                            </Grid>
                            <Grid item>
                                <UserShowCard 
                                profileImageUrlPath={data.profile_image_url}
                                UserName={data?.screen_name}
                                UserBio={data?.user_bio}
                                FollowingCount={10}
                                FollowerCount={100} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item lg ={6} md ={6} sm ={10} xs ={10}
                    sx ={{height:"100%"}}>
                        <Grid container direction="column" justifyContent="space-between" sx={{ width: "inherit" ,height:"100%"}}>
                            <Grid item>
                                <Typography variant="h5"> 현재 사용중인 서비스 : </Typography>
                                <Divider />
                            </Grid>
                            <Grid item>
                                <Paper variant="outlined" sx={{
                                    width:"inherit",
                                    height:"200px",
                                }}/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }

    return <ErrorNoticeCard />
}