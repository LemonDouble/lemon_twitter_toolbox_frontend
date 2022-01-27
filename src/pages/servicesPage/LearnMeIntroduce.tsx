import { Box, Divider, Grid, Paper, Typography } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import MenuBarWithoutNotification from "../../components/MenuBarWithoutNotification";
import ResponsiveIntroduceImageContainer from "../../components/ResponsiveIntroduceImageContainer";
import SendIcon from '@mui/icons-material/Send';
import React from "react";

export interface LearnMeProps {
}


export default function LearnMeIntroduce({}:LearnMeProps){

    const [loading, setLoading] = React.useState(false);
    function handleClick() {
        setLoading(true);
    }

    return(
        <Grid sx ={{
                width: "100vw",
                height: "100vh",
                overflowY:"scroll",
        }}>
            <MenuBarWithoutNotification />
            <Box sx = {{height:"50px"}}></Box>
            <Grid container justifyContent="center" sx={{width:"100%", height:"100%"}}>
                <Grid container rowSpacing={3} direction="column" justifyItems="center" alignItems="center" sx={{width:"80%"}}>
                    <Paper component={Grid} container item alignItems="center" direction="column" p="10px" sx={{width:"100%"}}>

                        <Typography variant="h3"> Learn Me! </Typography>
                        <Typography variant="subtitle2"> 내 트윗을 컴퓨터에게 학습시켜 나를 따라하는 도플갱어를 만들어 봐요! </Typography>

                        <Box sx = {{height:"20px"}}></Box>

                        <ResponsiveIntroduceImageContainer imageURL="/img/learn-me.png"/>
                    </Paper>

                    <Grid container item direction="column" rowSpacing={1} sx={{width:"100%"}}>
                        <Grid item>
                            <Divider />
                        </Grid>
                        <Grid container item justifyContent="center">
                            <LoadingButton
                            onClick={handleClick}
                            endIcon={<SendIcon />}
                            loading={loading}
                            loadingPosition="end"
                            variant="contained"
                            >
                                Send
                            </LoadingButton>
                        </Grid>
                        <Grid item>
                            <Divider />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}