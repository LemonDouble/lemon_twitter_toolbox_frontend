import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import MenuBarWithoutNotification from "../components/MenuBarWithoutNotification";
import RecommendServiceNoticeBoard from "../components/RecommendServiceNoticeBoard";
import { isLoginState } from "../recoil/isLogin";
import { AllServiceList } from "../recoil/ServiceList";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

export default function IntroducePage(){

    const allService = useRecoilValue(AllServiceList);
    const isLogin = useRecoilValue(isLoginState);

    const navigate = useNavigate();

    if(isLogin){
        return <Navigate replace to="/mypage" />
    }

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

                <Grid item lg ={10} md ={10} sm ={10} xs ={10}>
                    <Grid container direction="column" justifyContent="space-between" sx={{height:"100%",display:"flex"}}>
                        <Grid container direction="column" item sx={{height:"40px"}}>
                            <Typography variant="h5"> 저희는 이런 서비스들이 있어요! : </Typography>
                            <Divider />
                        </Grid>
                        <Grid container item flex={1}>
                            <RecommendServiceNoticeBoard
                            UsingServiceArray = {allService}/>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item lg ={10} md ={10} sm ={10} xs ={10}>
                    <Grid container direction="column" justifyContent="space-between" sx={{height:"100%",display:"flex"}}>
                        <Grid container direction="column" item sx={{height:"40px"}}>
                            <Button variant="outlined" startIcon={<KeyboardReturnIcon />}
                            onClick={()=> navigate("/")}>
                                홈으로 돌아가기
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>



                {/* 서비스에 아직 Footer 없는데, 마지막 컴포넌트가 바닥에 딱 붙으면 보기 좀 그러니까 추가해줌*/}
                <Grid item lg ={10} md ={10} sm ={10} xs ={10} sx={{height:"30px"}}/>

            </Grid>
        </Grid>

    )
}