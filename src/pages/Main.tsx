import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Link, Typography } from "@mui/material";
import TwitterIcon from '@mui/icons-material/Twitter';
import './Main.css';
import useRequestToken from "../hooks/useRequestToken";
import React, { useState } from "react";
import ErrorNoticeCard from "../components/ErrorNoticeCard";
import { useNavigate } from "react-router-dom";
import LoadingComponent from "../components/LoadingComponent";
import useLearnMeCanUse from "../hooks/useLearnmeCanUse";


export default function Main(){

    const navigate = useNavigate();

    const {isLoading, error, data } = useRequestToken(true);

    const learnMeCanUseQuery = useLearnMeCanUse();

    const [openNotification, setOpenNotification] = useState(true);
    
    const handleClose = () => {
        setOpenNotification(false);
    }

    if(isLoading || learnMeCanUseQuery.isLoading){
        return (
            <LoadingComponent loadingMessage="Loading.." />
        )
    }
    
    if(error || learnMeCanUseQuery.error){
        if(error){
            alert("오류가 발생했습니다 : " + error.message);
        }
        if(learnMeCanUseQuery.isError){
            alert("오류가 발생했습니다 : " + learnMeCanUseQuery.error.message);
        }
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
                    <Typography variant="h2"> LEMON TOOLBOX</Typography>
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
            <DialogTitle>{"베타 서비스 종료 및 정식 서비스 오픈 알림"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {`베타 서비스 기간 동안 크리티컬한 버그를 수정하고, 개인정보 처리 방침 등을 강화하여 정식 서비스를 하게 되었어요!`} <br/><br/>
                    {`여러분의 관심 덕분에 베타 서비스 기간 동안 3519명의 2,727,758 개의 트윗을 처리하였으나, 해당 데이터는 개인정보 처리 방침 동의를 받지 않았으므로 일괄 폐기했어요.`}<br/><br />
                    {`귀찮게 왜 그렇게까지 하냐고 생각하실수도 있지만, Learn-me 서비스는 여러분의 트윗(개인정보) 를 다루는 서비스이고, 이루다 등의 나쁜 선례가 있는 만큼 관련 부분에서 확실히 하기 위한 노력이라 생각해 주시면 감사할 것 같아요.`} <br/><br/>
                    {`다시 명시하자면, Learn Me 서비스는 여러분의 데이터를 지금도, 앞으로도 다른 서비스에 활용할 계획이 없으며 개발자 사비로 제공되는 서비스에요.`} <br />
                    {`분에 넘치는 관심을 주신 만큼, 신뢰로 보답하고 싶어요.`}<br /><br/>
                    {`오늘의 이용자 숫자는 ${learnMeCanUseQuery.data?.register_count} / ${learnMeCanUseQuery.data?.register_limit} 명이에요! 이용자 제한은 매일 아침 6시에 초기화돼요.`}<br/><br/>
                    {`알려진 버그나 최신 업데이트 소식은`} <Link href="https://twitter.com/lemon_toolbox"
                    target="_blank" rel="noopener">@lemon_toolbox</Link> {`에서 확인할 수 있어요.`} <br/>
                </DialogContentText>
                <DialogActions>
                    <Button onClick={handleClose}> 확인했어요!</Button>
                </DialogActions>
            </DialogContent>
        </Dialog>

        </>
    )
}