import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Link, Typography } from "@mui/material";
import TwitterIcon from '@mui/icons-material/Twitter';
import './Main.css';
import useRequestToken from "../hooks/useRequestToken";
import React, { useState } from "react";
import ErrorNoticeCard from "../components/ErrorNoticeCard";
import { useNavigate } from "react-router-dom";
import LoadingComponent from "../components/LoadingComponent";


export default function Main(){

    const navigate = useNavigate();

    const {isLoading, error, data } = useRequestToken(true);


    const [openNotification, setOpenNotification] = useState(true);
    
    const handleClose = () => {
        setOpenNotification(false);
    }

    if(isLoading){
        return (
            <LoadingComponent loadingMessage="Loading.." />
        )
    }
    
    if(error){
        alert("오류가 발생했습니다 : " + error.message);
        return <ErrorNoticeCard />
    }

    return (
        <>
        <Grid container direction="row" justifyContent="center" spacing={3}>
            <Grid item xl={3} lg ={4} md ={4} sm ={8} xs ={8}>
                <Avatar
                alt = "service logo"
                src = "/img/toolboxLogo.png"
                variant ="square"
                sx ={{width: "80%", height: "80%"}}>
                </Avatar>
            </Grid>
            <Grid item xl= {4} lg = {5} md ={5} sm ={10} xs = {10}>
                <Grid container direction="column" justifyContent="flex-end"  alignItems="flex-end" rowSpacing="10px">
                    <Grid item lg={3}>
                    <Typography variant="h2"> LEMON TOOLBOX (BETA)</Typography>
                    </Grid>
                    <Grid item lg={2}>
                    <Typography variant="subtitle1"> 재미있는 여러 트위터 확장 기능을 로그인 한 번에 간편하게</Typography>
                    </Grid>
                    <Grid container direction="row" justifyContent="flex-end" alignItems="flex-end" columnSpacing="20px">
                        <Grid item>
                        <Button variant="outlined" size="large" onClick={() => navigate("/introduce")}> 살펴보기 </Button>
                        </Grid>
                        <Grid item>
                        <Button variant="contained"
                        size="large"
                        startIcon ={<TwitterIcon />}
                        href ={data?.authentication_url}
                        >트위터로 로그인</Button>
                        </Grid>
                    </Grid>
                    <Grid item lg={3}>
                    <Typography> made by : 
                        <Link 
                        href ="https://twitter.com/_lemon_berry_" 
                        underline="none"
                        target="_blank"
                        rel="noopener">@_lemon_berry_</Link> 
                    </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item sx={{display : {xl:"block", lg:"block", md:"block", sm : "none", xs:"none"}}}>
                <section>
                <div className="wave water"></div>
                <div className="wave water"></div>
                <div className="wave water"></div>
                <div className="wave water"></div>
                </section>
            </Grid>
        </Grid>
        <Dialog
        open={openNotification}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
            <DialogTitle>{"슬픈 일이에요."}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    현재 트위터 API 리밋으로 일시적으로 추가 등록이 불가능해요. <br/>
                    하지만, 이미 훈련한 데이터가 있는 경우(완료 알람을 받은 경우) 는 정상적으로 사용할 수 있어요. <br/><br/>
                    훈련 등록은 되었는데 완료 알람이 안 오시는 분들도, API 리밋이 해결되는 대로 완료 알람을 보내드릴게요. <br/><br/>
                    생각보다 더 많은 관심을 받았는데, 개발팀이 저 혼자라 대응하는데 시간이 좀 걸릴 수도 있어요. 그래도 최대한 빨리 고치도록 노력해 보겠습니다. <br />
                    관련된 실시간 업데이트는 <a href="https://twitter.com/_lemon_berry_/status/1497439151133986820">여기</a> 서 볼 수 있어요. <br /><br/>
                    취미로 만든 프로젝트에, 많은 관심 주셔서 정말 감사드려요! <br />
                </DialogContentText>
                <DialogActions>
                    <Button onClick={handleClose}> 저런! 화이팅 하세요!</Button>
                </DialogActions>
            </DialogContent>
        </Dialog>

        </>
    )
}