import {  Grid, Stack } from "@mui/material";
import { useRecoilValue } from "recoil";
import MenuBarWithoutNotification from "../../components/MenuBarWithoutNotification";
import { isLoginState } from "../../recoil/isLogin";
import useServerProfile from "../../hooks/useServerProfile";
import ErrorNoticeCard from "../../components/ErrorNoticeCard";
import Chatbot from "../../components/chatbot/Chatbot";
import LoadingComponent from "../../components/LoadingComponent";
import BasicBreadcrumbs from "../../components/BasicBreadcrumbs";
import { Navigate } from "react-router-dom";


export default function LearnMeChatPage(){

  const isLogin = useRecoilValue(isLoginState);
  const profileQuery = useServerProfile(isLogin);

  const pathData = [{title:"Home", href:"/mypage", isLink:true},{title:"Learn-me", href:"/learn-me", isLink:true}
,{title:"Chatbot", href:"/laern-me/chatbot", isLink:false}]


    if(!isLogin){
        alert("로그인을 먼저 해 주세요!");
        return <Navigate replace to="/" />
    }

    if(profileQuery.isLoading){
      return <LoadingComponent loadingMessage="Loading.." />
    }

    if(profileQuery.error){
        alert("오류가 발생했습니다 : " + profileQuery.error.message);
        return <ErrorNoticeCard />
    }

    if(profileQuery.data){
        
        return (
        <Grid sx={{
            width: "100vw",
            height : "100vh",
            overflowY:"scroll"
        }}>
            <MenuBarWithoutNotification />
            <Grid item sx ={{height:"20px"}} />
            <Stack alignItems="center" spacing={2}>
                <BasicBreadcrumbs pathData={pathData} />
                <Chatbot userData={profileQuery.data}/>
            </Stack>

        </Grid>
        )
    }

    return <></>
}