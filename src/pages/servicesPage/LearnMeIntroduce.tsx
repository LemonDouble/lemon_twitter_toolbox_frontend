import { Box, Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import MenuBarWithoutNotification from "../../components/MenuBarWithoutNotification";
import ResponsiveIntroduceImageContainer from "../../components/ResponsiveIntroduceImageContainer";
import SendIcon from '@mui/icons-material/Send';
import React from "react";
import LeftImageIntroduceCard from "../../components/LeftImageIntroduceCard";
import RightImageIntroduceCard from "../../components/RightImageIntroduceCard";
import axios from "axios";
import { Mutation, useMutation } from "react-query";

export interface LearnMeProps {
}


export default function LearnMeIntroduce({}:LearnMeProps){

    const mutation = useMutation(() => axios.post("/api/twitter/service/learn_me"))

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
                <Stack spacing={3} alignItems="center" sx={{width:"80%"}}>

                    <Paper component={Grid} container item alignItems="center" direction="column" p="10px" sx={{width:"100%"}}>

                        <Typography variant="h3"> Learn Me! </Typography>
                        <Typography variant="subtitle2"> 내 트윗을 컴퓨터에게 학습시켜 나를 따라하는 도플갱어를 만들어 봐요! </Typography>

                        <Box sx = {{height:"20px"}}></Box>

                        <ResponsiveIntroduceImageContainer imageURL="/img/learn-me.png"/>
                    </Paper>

                    <Grid container item direction="column" rowSpacing={2} sx={{width:"100%"}}>
                        <Grid item>
                            <Divider />
                        </Grid>
                        <Grid container item justifyContent="center">
                            <LoadingButton
                            onClick={()=> mutation.mutate()}
                            endIcon={<SendIcon />}
                            loading={mutation.isLoading}
                            loadingPosition="end"
                            variant="contained"
                            >
                                실행하기!
                            </LoadingButton>
                        </Grid>
                        <Grid item>
                            <Divider />
                        </Grid>
                    </Grid>

                    <LeftImageIntroduceCard 
                    title ="인공지능을 이용한 챗봇 생성기!"
                    content ="Learn Me!는 BERT라는 구글이 발표한 인공지능 모델을 사용해서 학습해요.
                    33억개나 되는 단어를 미리 공부한 모델이죠! 이 모델이 여러분의 트윗을 보고 따라할 거에요!"
                    imageURL="/img/introduce/googleLogo.png"/>

                    <RightImageIntroduceCard 
                    title ="학습 방법"
                    content ="여러분의 최근 트윗을 기반으로 누군가가 나에게 보낸 멘션을 질문, 답한 멘션을 정답 이라고 컴퓨터에게 가르칠 거에요!
                    이후, 여러분이 질문을 했을 때 '여러분이 했던 말 중' 가장 그럴듯한 대답을 따라할 거에요!"
                    imageURL="/img/introduce/twitterLogo.png"
                    />

                    <LeftImageIntroduceCard 
                    title ="개인 정보 보호"
                    content = "학습 과정에서 여러분의 트윗을 컴퓨터가 학습할 거에요. 이후 학습한 데이터는 암호화되어서 서버에 저장될 예정이에요. 하지만 언제라도, 만약 내 트윗이 서버에 남아있는게 마음에 들지 않는다면 이 페이지에서 바로 삭제할 수 있어요!"
                    imageURL="/img/introduce/secureLogo.png"
                    />

                    <RightImageIntroduceCard 
                    title ="데이터 사용"
                    content ="여러분의 트윗 데이터는 챗봇 사용 외에 그 어떤 곳에도 사용되지 않아요! 이 서버는 개발자의 개인 사비로 운영되고 있어요!"
                    imageURL="/img/introduce/databaseLogo.png"
                    />

                </Stack>
            </Grid>
        </Grid>
    )
}