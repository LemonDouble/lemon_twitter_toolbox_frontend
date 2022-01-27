import { Box, Divider, Grid, Typography } from "@mui/material";
import { useRecoilValue } from "recoil";
import ErrorNoticeCard from "../components/ErrorNoticeCard";
import MenuBarWithoutNotification from "../components/MenuBarWithoutNotification";
import RecommendServiceNoticeBoard from "../components/RecommendServiceNoticeBoard";
import UserShowCard from "../components/UserShowCard";
import UsingServiceNoticeBoard from "../components/UsingServiceNoticeBoard";
import useServerProfile from "../hooks/useServerProfile";
import { AllServiceList } from "../recoil/ServiceList";


export default function MyPage(){

    const { isLoading, error, data } = useServerProfile();
    
    const allService = useRecoilValue(AllServiceList);

    if(isLoading) return <>Loading..</>
    
    if(error){
        return <ErrorNoticeCard />
    }

    if(data){
        return (
            <Grid sx ={{
                width: "100vw",
                height: "100vh",
                overflowY:"scroll"
            }}>
                <MenuBarWithoutNotification></MenuBarWithoutNotification>
                <Box sx = {{height:"20px"}}></Box>
                <Grid container spacing={3} direction="row" 
                sx={{
                    height: "300px",
                    justifyContent : "center",
                    display:"flex"
                }}>

                    <Grid item lg ={4} md ={4} sm ={10} xs ={10} sx={{height:"100%"}}>
                        <Grid container direction="column" justifyContent="space-between" sx={{height:"100%"}}>
                            <Grid container direction="column" item sx={{height:"40px"}}>
                                <Typography variant="h5"> 로그인 중인 사용자 : </Typography>
                                <Divider />
                            </Grid>
                            <Grid container item flex={1}>
                                <UserShowCard 
                                profileImageUrlPath={data.profile_image_url}
                                UserName={data?.screen_name}
                                UserBio={data?.user_bio}
                                FollowingCount={10}
                                FollowerCount={100} />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item lg ={6} md ={6} sm ={10} xs ={10} sx ={{height:"100%"}}>
                        <Grid container direction="column" justifyContent="space-between" sx={{height:"100%",display:"flex"}}>
                            <Grid container direction="column" item sx={{height:"40px"}}>
                                <Typography variant="h5"> 현재 사용중인 서비스 : </Typography>
                                <Divider />
                            </Grid>
                            <Grid container item flex={1}>
                                <UsingServiceNoticeBoard
                                UsingServiceArray = {allService}/>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item lg ={10} md ={10} sm ={10} xs ={10} sx ={{height:"100%"}}>
                        <Grid container direction="column" justifyContent="space-between" sx={{height:"100%",display:"flex"}}>
                            <Grid container direction="column" item sx={{height:"40px"}}>
                                <Typography variant="h5"> 이런 서비스는 어떠세요? : </Typography>
                                <Divider />
                            </Grid>
                            <Grid container item flex={1}>
                                <RecommendServiceNoticeBoard
                                UsingServiceArray = {allService}/>
                            </Grid>
                        </Grid>
                    </Grid>
                    

                </Grid>
            </Grid>

        )
    }

    return <ErrorNoticeCard />
}