import { Button, Grid, Link, Typography } from "@mui/material";
import TwitterIcon from '@mui/icons-material/Twitter';
import './Main.css';
import {requestURI} from '../lib/serverData';
import { useQuery } from "react-query";

type RequestToken = {
    token: string;
    tokenSecret : string;
    authorizationURL : string;
    authenticationURL : string;
}

export default function Main(){

    
    const {isLoading, error, data } = useQuery<RequestToken, Error>('responseToken', async ():Promise<RequestToken> =>{
        return await fetch(requestURI + "/api/oauth/request-token").then(
            res => res.json()
        )
    })


    if(isLoading) return <>Loading..</>


    return (
        <>
        <Grid container direction="row" justifyContent="center">
            <Grid item xs ={3}>
                <img src="/img/toolboxLogo.png" />
            </Grid>
            <Grid item lg = {5}>
                <Grid container direction="column" justifyContent="flex-end"  alignItems="flex-end" rowSpacing="10px">
                    <Grid item lg={3}>
                    <Typography variant="h1"> LEMON TOOLBOX </Typography>
                    </Grid>
                    <Grid item lg={2}>
                    <Typography variant="subtitle1"> 재미있는 여러 트위터 확장 기능을 로그인 한 번에 간편하게</Typography>
                    </Grid>
                    <Grid container direction="row" justifyContent="flex-end" alignItems="flex-end" columnSpacing="20px">
                        <Grid item>
                        <Button variant="outlined" size="large"> 살펴보기 </Button>
                        </Grid>
                        <Grid item>
                        <Button variant="contained"
                        size="large"
                        startIcon ={<TwitterIcon />}
                        href ={data?.authenticationURL}
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
        </Grid>

        <section>
            <div className="wave water"></div>
            <div className="wave water"></div>
            <div className="wave water"></div>
            <div className="wave water"></div>
        </section>
        </>
    )
}