import { Box, Divider, Grid, Typography } from "@mui/material";
import { useRecoilValue } from "recoil";
import ErrorNoticeCard from "../components/ErrorNoticeCard";
import MenuBarWithoutNotification from "../components/MenuBarWithoutNotification";
import RecommendServiceNoticeBoard from "../components/RecommendServiceNoticeBoard";
import UserShowCard from "../components/UserShowCard";
import UsingServiceNoticeBoard from "../components/UsingServiceNoticeBoard";
import useServerProfile from "../hooks/useServerProfile";
import useServerRegisteredService from "../hooks/useServerRegisteredService";
import { isLoginState } from "../recoil/isLogin";
import { AllServiceList } from "../recoil/ServiceList";
import { Navigate } from "react-router-dom";
import LoadingComponent from "../components/LoadingComponent";

export default function MyPage(){


    const isLogin = useRecoilValue(isLoginState);
    const allService = useRecoilValue(AllServiceList);

    const profileQuery = useServerProfile(isLogin);
    const RegisteredServiceQuery = useServerRegisteredService(isLogin);

    if(!isLogin){
        return <Navigate replace to="/introduce" />
    }

    if(profileQuery.isLoading || RegisteredServiceQuery.isLoading ) {
        return <LoadingComponent loadingMessage="Loading.." />
    }
    
    if(profileQuery.error || RegisteredServiceQuery.isError){
        return <ErrorNoticeCard />
    }

    if(profileQuery.data && RegisteredServiceQuery.data ){
        const registeredServiceArray = RegisteredServiceQuery.data.map(
            item => allService.filter(serviceItem => serviceItem.serviceName === item.service_type)
        ).reduce((prev,next) => prev.concat(next),[])

        return (
            <Grid sx ={{
                width: "100vw",
                height: "100vh",
                overflowY:"scroll",
            }}>
                <MenuBarWithoutNotification />
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
                                <Typography variant="h5"> ????????? ?????? ????????? : </Typography>
                                <Divider />
                            </Grid>
                            <Grid container item flex={1}>
                                <UserShowCard 
                                profileImageUrlPath={profileQuery.data.profile_image_url}
                                UserName={profileQuery.data?.screen_name}
                                UserBio={profileQuery.data?.user_bio}
                                FollowingCount={profileQuery.data?.following_count}
                                FollowerCount={profileQuery.data?.follower_count} />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item lg ={6} md ={6} sm ={10} xs ={10} sx ={{height:"100%"}}>
                        <Grid container direction="column" justifyContent="space-between" sx={{height:"100%",display:"flex"}}>
                            <Grid container direction="column" item sx={{height:"40px"}}>
                                <Typography variant="h5"> ?????? ???????????? ????????? : </Typography>
                                <Divider />
                            </Grid>
                            <Grid container item flex={1}>
                                <UsingServiceNoticeBoard
                                UsingServiceArray = {registeredServiceArray}/>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item lg ={10} md ={10} sm ={10} xs ={10}>
                        <Grid container direction="column" justifyContent="space-between" sx={{height:"100%",display:"flex"}}>
                            <Grid container direction="column" item sx={{height:"40px"}}>
                                <Typography variant="h5"> ?????? ???????????? ????????????? : </Typography>
                                <Divider />
                            </Grid>
                            <Grid container item flex={1}>
                                <RecommendServiceNoticeBoard
                                UsingServiceArray = {allService}/>
                            </Grid>
                        </Grid>
                    </Grid>


                    {/* ???????????? ?????? Footer ?????????, ????????? ??????????????? ????????? ??? ????????? ?????? ??? ???????????? ????????????*/}
                    <Grid item lg ={10} md ={10} sm ={10} xs ={10} sx={{height:"100px"}}/>

                </Grid>
            </Grid>

        )
    }

    return <ErrorNoticeCard />
}