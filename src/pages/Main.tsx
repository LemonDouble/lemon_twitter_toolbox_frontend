import { Avatar, Button, Grid, Link, Typography } from "@mui/material";
import TwitterIcon from '@mui/icons-material/Twitter';
import './Main.css';
import useRequestToken from "../hooks/useRequestToken";
import React from "react";
import ErrorNoticeCard from "../components/ErrorNoticeCard";
import { useNavigate } from "react-router-dom";
import LoadingComponent from "../components/LoadingComponent";


export default function Main(){

    const navigate = useNavigate();

    const {isLoading, error, data } = useRequestToken();

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
                    <Typography variant="h2"> LEMON TOOLBOX </Typography>
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
        </>
    )
}