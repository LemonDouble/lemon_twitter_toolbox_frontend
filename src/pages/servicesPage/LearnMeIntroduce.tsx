import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, Paper, Snackbar, Stack, Typography } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import MenuBarWithoutNotification from "../../components/MenuBarWithoutNotification";
import ResponsiveIntroduceImageContainer from "../../components/ResponsiveIntroduceImageContainer";
import SendIcon from '@mui/icons-material/Send';
import LeftImageIntroduceCard from "../../components/LeftImageIntroduceCard";
import RightImageIntroduceCard from "../../components/RightImageIntroduceCard";
import axios from "axios";
import { useMutation } from "react-query";
import { useRecoilValue } from "recoil";
import { isLoginState } from "../../recoil/isLogin";
import { useNavigate } from "react-router-dom";
import ErrorNoticeCard from "../../components/ErrorNoticeCard";
import moment from "moment";
import useServerRegisteredService, { serverRegisteredService } from "../../hooks/useServerRegisteredService";
import LoadingComponent from "../../components/LoadingComponent";
import { useEffect, useState } from "react";
import TwitterIcon from '@mui/icons-material/Twitter';
import useRequestToken from "../../hooks/useRequestToken";
import BasicBreadcrumbs from "../../components/BasicBreadcrumbs";
import { snackbarState } from "../../App";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import useLearnMeCanUse from "../../hooks/useLearnmeCanUse";
export interface LearnMeProps {
}


export default function LearnMeIntroduce(){

    const registerMutation = useMutation(() => axios.post("/api/service/learn_me"))
    const unRegisterMutation = useMutation(() => axios.delete("/api/service/learn_me"))
    const navigate = useNavigate();

    const isLogin = useRecoilValue(isLoginState);
    const RegisteredServiceQuery = useServerRegisteredService(isLogin);
    const canUseLearnMeQuery = useLearnMeCanUse();
    const RequestTokenQuery = useRequestToken(!isLogin);

    const [ learnMeStatus, setLearnMeStatus ] = useState<serverRegisteredService>();
    const [ cooldownStatus, setCooldownStatus] = useState({
        isCooldown : false,
        cooldownInHours : 0,
        cooldownInMinutes : 0,
    });

    const [ alertOpen, setAlertOpen] = useState(false);
    const handleClickAlertOpen  = () => {
        setAlertOpen(true);
    };
    const handleAlertClose = () => {
        setAlertOpen(false);
    }

    async function handleServiceAgreeClick() {
        handleAlertClose();
        const result = await registerMutation.mutateAsync();
        await RegisteredServiceQuery.refetch();
        if(result.status === 201){
            openSuccessSnackbar(`정상적으로 등록되었어요!
            완료되는 대로 알려드릴게요!
            오늘 (${result.data.register_count}/${result.data.register_limit}) 번째 손님이에요!`);
        }else{
            openErrorSnackbar(`그 사이에 오늘 사용가능한 사람 수가 다 차버렸어요 ㅠㅠ 정말 죄송하지만 다음에 다시 시도해 주세요.`);
        }
    }

    async function handleUnregisterServiceClick(){
        const result = await unRegisterMutation.mutateAsync();
        await RegisteredServiceQuery.refetch();
        setLearnMeStatus(undefined);
        if(result.status === 200){
            openSuccessSnackbar(`정상적으로 삭제되었어요! Learn Me 서비스를 이용해 주셔서 감사합니다!`);
        }else{
            openErrorSnackbar(`뭔가 오류가 생겼어요. 죄송하지만 다시 한번 시도해주세요.`);
        }
    }

    const [ snackbarState, handleSnackbarState] = useState<snackbarState>({
        open: false,
        severity: "info",
        message: "",
    })

    const openSuccessSnackbar = (message:string) => {
        handleSnackbarState({
            open:true,
            severity: "success",
            message:message
        })
    }

    const openErrorSnackbar = (message:string) => {
        handleSnackbarState({
            open:true,
            severity: "error",
            message:message
        })
    }

    const handleSnackbarClose = () => {
        handleSnackbarState({
        open: false,
        severity: "info",
        message: "",
    })
    }



    const pathData = [{title:"Home", href:"/mypage", isLink:true},{title:"Learn-me", href:"/learn-me", isLink:false}]

    useEffect(()=> {
        if(isLogin && RegisteredServiceQuery.data){
        const learnMeStatus = RegisteredServiceQuery.data.filter(
            serviceItem => serviceItem.service_type === "LEARNME"
        );

        if(learnMeStatus.length === 1){
            setLearnMeStatus(learnMeStatus[0])
            const nextCooldown = moment(learnMeStatus[0].can_use_time);
            // 만약 다음 사용 가능 시간이 지금보다 크다면, 지금은 사용 불가
            const isCooldown = nextCooldown > moment();
            const cooldownInHours = nextCooldown.diff(moment(), 'hours');
            const cooldownInMinutes = nextCooldown.diff(moment(), 'minute') - (cooldownInHours*60);

            setCooldownStatus({
                isCooldown: isCooldown,
                cooldownInHours : cooldownInHours,
                cooldownInMinutes : cooldownInMinutes
            })
        }
    }
    }, [RegisteredServiceQuery.data, isLogin])

    if(isLogin && RegisteredServiceQuery.isLoading){
        return <LoadingComponent loadingMessage="Loading.." />
    }
    
    if(isLogin && RegisteredServiceQuery.error){
        alert("오류가 발생했습니다 : " + RegisteredServiceQuery.error.message);
        return <ErrorNoticeCard />
    }

    return(
        <>
        <Grid sx ={{
                width: "100vw",
                height: "100vh",
                overflowY:"scroll",
        }}>
            <MenuBarWithoutNotification />
            <Box sx = {{height:"50px"}}></Box>
            <Grid container justifyContent="center" sx={{width:"100%", height:"100%"}}>
                <Stack spacing={3} alignItems="center" sx={{width:"80%"}}>
                    <BasicBreadcrumbs pathData={pathData} />
                    <Paper component={Grid} container item alignItems="center" direction="column" p="10px" sx={{width:"100%"}}>

                        <Typography variant="h3"> Learn Me! </Typography>
                        <Typography variant="subtitle2"> 내 트윗을 컴퓨터에게 학습시켜 나를 따라하는 도플갱어를 만들어 봐요! </Typography>
                        <Typography variant="subtitle2"> 컴퓨터가 최근 내 트윗 3200개를 읽고 내가 받은 질문과, 내가 한 대답을 학습해요. </Typography>
                        <Typography variant="subtitle2"> 트위터 API가 최대 3200개의 트윗밖에 제공해 주지 않아, 인공지능이라도 학습에 한계가 있어요.</Typography>
                        <Typography variant="subtitle2"> 그런 점을 감안하고, 재밌는 가십거리 정도로만 즐겨주셨으면 좋겠어요!</Typography>
                        <Box sx = {{height:"20px"}}></Box>
                        
                        <ResponsiveIntroduceImageContainer imageURL="/img/learn-me.png"/>
                    </Paper>

                    <Grid container item direction="column" rowSpacing={2} sx={{width:"100%"}}>
                        {isLogin && learnMeStatus?.ready ?
                        <Stack alignItems="center" spacing={1} sx={{width:"100%"}}>
                            <Typography variant="h5" color="success">학습이 완료되었어요! </Typography>
                            <Button variant="contained" color="success" endIcon={<SendIcon />}
                            onClick={() => {navigate("/learn-me/chatbot")}}
                            >
                                챗봇 사용하러 가기
                            </Button>
                            <LoadingButton
                            onClick={handleUnregisterServiceClick}
                            endIcon={<DeleteForeverIcon />}
                            loading={unRegisterMutation.isLoading}
                            loadingPosition="end"
                            variant="contained"
                            color="error"
                            >
                                내 데이터 삭제하기
                            </LoadingButton>
                        </Stack>
                        :
                            isLogin && learnMeStatus?.ready === false &&
                            <Stack alignItems="center" spacing={1} sx={{width:"100%"}}>
                                <Typography variant="body1">컴퓨터가 트윗 데이터를 학습중이에요! 조금만 기다려주세요!</Typography>
                                <Typography variant="body1">완료시 트위터에서 트윗으로 알려 드려요!</Typography>
                            </Stack>
                        }
                        <Grid item>
                            <Divider />
                        </Grid>
                        {
                            isLogin ? 
                                cooldownStatus.isCooldown ?
                                <Grid item>
                                    <Stack spacing={1} alignItems="center">
                                        <Typography variant="h5">이미 최근에 데이터 수집을 실행했어요!</Typography>
                                        <Typography variant="h5">
                                            다음 사용 가능 시간은 {cooldownStatus.cooldownInHours} 시간
                                         {cooldownStatus.cooldownInMinutes}분 후에요! </Typography>
                                    </Stack>
                                </Grid>
                                :
                                    canUseLearnMeQuery.data?.can_use?
                                        <Grid container item justifyContent="center">
                                            <Stack spacing={1} alignItems="center">
                                                <Typography variant="subtitle1"> 베타 버전이라 버그가 있을 수도 있어요. 뭔가 안 되면 @_lemon_berry_ 로 문의주세요!</Typography>
                                                <LoadingButton
                                                    onClick={handleClickAlertOpen}
                                                    endIcon={<SendIcon />}
                                                    loading={registerMutation.isLoading}
                                                    loadingPosition="end"
                                                    variant="contained"
                                                    >
                                                        데이터 학습시키기!
                                                </LoadingButton>
                                            </Stack>
                                        </Grid>
                                    :
                                        canUseLearnMeQuery.data?.can_use !== undefined &&
                                        <Grid container item justifyContent="center">
                                            <Stack spacing={1} alignItems="center">
                                                <Typography variant="subtitle1"> 오늘 처리 가능한 사람 수를 초과했어요!</Typography>
                                                <Typography variant="subtitle1"> 아쉽지만, 다음 기회를 노려주세요!! 리밋은 매일 아침 6시에 초기화돼요.</Typography>
                                            </Stack>
                                        </Grid>
                            :
                                canUseLearnMeQuery.data?.can_use ?
                                    <Grid container item justifyContent="center">
                                        <LoadingButton
                                        variant="contained"
                                        startIcon ={<TwitterIcon />}
                                        href={RequestTokenQuery.data?.authentication_url}
                                        >
                                            로그인하고 실행하기!
                                        </LoadingButton>
                                    </Grid>
                                :
                                    canUseLearnMeQuery.data?.can_use !== undefined &&
                                        <Grid container item justifyContent="center">
                                            <Typography variant="subtitle1"> 오늘 처리 가능한 사람 수를 초과했어요!</Typography>
                                            <Typography variant="subtitle1"> 아쉽지만, 다음 기회를 노려주세요!! 리밋은 매일 아침 6시에 초기화돼요.</Typography>
                                        </Grid>
                        }
                        
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
                    content = "학습 과정에서 여러분의 트윗을 컴퓨터가 학습할 거에요. 이후 학습한 데이터는 암호화되어서 서버에 저장될 예정이에요. 데이터는 챗봇 제외 아무 곳에도 사용되지 않고, 서비스 종료시 일괄 폐기돼요."
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

        <Dialog
        open={alertOpen}
        onClose={handleAlertClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"트윗 알람 전송 알림"}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    트윗 학습은 시간이 조금 걸려요! <br/>
                    학습이 완료된 후, 완료 알림을 트윗으로 보내도 괜찮을까요? <br/>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleAlertClose}>거부</Button>
                <Button onClick={handleServiceAgreeClick} autoFocus>동의 </Button>
            </DialogActions>
        </Dialog>
        <Snackbar 
        open={snackbarState.open}
        onClose={handleSnackbarClose}
        autoHideDuration={6000}
        anchorOrigin={{vertical:"top", horizontal:"center"}}
        >
            <Alert severity={snackbarState.severity}>{snackbarState.message}</Alert>
        </Snackbar>
        </>
    )
}