import { Grid } from "@mui/material";
import { useRecoilValue } from "recoil";
import MenuBarWithoutNotification from "../../components/MenuBarWithoutNotification";
import { isLoginState } from "../../recoil/isLogin";
import useServerProfile from "../../hooks/useServerProfile";
import ErrorNoticeCard from "../../components/ErrorNoticeCard";
import Chatbot from "../../components/chatbot/Chatbot";


export default function LearnMeChatPage(){

  const isLogin = useRecoilValue(isLoginState);
  const profileQuery = useServerProfile(isLogin);


  if(profileQuery.isLoading) return <>Loading..</>

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
            <Grid item container
            sx={{
                justifyContent:"center"
            }}
            >
                <Chatbot userData={profileQuery.data}/>
            </Grid>
        </Grid>
        )
    }

    return <></>
}