import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogProps, DialogTitle, Divider, Grid, Link, Paper, Snackbar, Stack, Typography } from "@mui/material";
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
import { useEffect, useRef, useState } from "react";
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

    const [alertTermsOfUseOpen, setAlertTermsOfUseOpen] = useState(false);

    const descriptionElementRef = useRef<HTMLElement>(null);
    const handleTermsOfUseOpen = () => {
        setAlertTermsOfUseOpen(true);
    }

    const handleTermsOfUseClose = () => {
        setAlertTermsOfUseOpen(false);
    }

    const handleTermsOfUseAgreeClick = () => {
        setAlertTermsOfUseOpen(false);
        handleClickAlertOpen();
    }


    const [ alertConfirmTweetNotificationDialogOpen, setAlertConfirmTweetNotificationDialogOpen] = useState(false);

    const handleClickAlertOpen  = () => {
        setAlertConfirmTweetNotificationDialogOpen(true);
    };
    const handleAlertClose = () => {
        setAlertConfirmTweetNotificationDialogOpen(false);
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

        if(alertTermsOfUseOpen){
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }
    }, [RegisteredServiceQuery.data, isLogin, alertTermsOfUseOpen])

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
                                        <Typography variant="body1">이미 최근에 데이터 수집을 실행했어요!</Typography>
                                        <Typography variant="h5">
                                            다음 추가 학습 가능 시간은 {cooldownStatus.cooldownInHours} 시간
                                         {cooldownStatus.cooldownInMinutes}분 후에요! </Typography>
                                    </Stack>
                                </Grid>
                                :
                                    canUseLearnMeQuery.data?.can_use?
                                        <Grid container item justifyContent="center">
                                            <Stack spacing={1} alignItems="center">
                                                <Typography variant="subtitle1"> 베타 버전이라 버그가 있을 수도 있어요. 뭔가 안 되면 @_lemon_berry_ 로 문의주세요!</Typography>
                                                <LoadingButton
                                                    onClick={handleTermsOfUseOpen}
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

                        <Grid item>
                            <Stack alignItems="center" spacing={1} sx={{width:"100%"}}>
                                <Typography variant="caption">
                                    해당 모델은 
                                    <Link href="https://github.com/jhgan00"target="_blank" rel="noopener"> jhgan00 </Link>
                                    님의
                                    <Link href="https://github.com/jhgan00/ko-sentence-transformers?fbclid=IwAR05X_FSkQWAtIjcL1L-saTUJT5usBGqISKckLl6NdWgprOjboY5JLPNZqc"target="_blank" rel="noopener"> ko-sbert-multitask </Link>
                                    입니다. 좋은 모델 제공에 감사드립니다!
                                </Typography>
                            </Stack>
                        </Grid>


                        
                        <Grid item>
                            <Divider />
                        </Grid>
                    </Grid>

                    <LeftImageIntroduceCard 
                    title ="인공지능을 이용한 챗봇 생성기!"
                    content ="Learn Me!는 BERT라는 구글이 발표한 인공지능 모델을 사용해서 학습해요.
                    여러 모델 중 이 모델이 여러분의 트윗을 보고 따라할 거에요!"
                    imageURL="/img/introduce/googleLogo.png"/>

                    <RightImageIntroduceCard 
                    title ="학습 방법"
                    content ="여러분의 최근 트윗을 기반으로 누군가가 나에게 보낸 멘션을 질문, 답한 멘션을 정답 이라고 컴퓨터에게 가르칠 거에요!
                    이후, 여러분이 질문을 했을 때 '여러분이 했던 말 중' 가장 그럴듯한 대답을 따라할 거에요!"
                    imageURL="/img/introduce/twitterLogo.png"
                    />

                    <LeftImageIntroduceCard 
                    title ="개인 정보 보호"
                    content = "학습 과정에서 여러분의 트윗을 컴퓨터가 학습할 거에요. 이후 학습한 데이터는 암호화되어 (AES-256) 서버에 저장될 예정이에요. 데이터는 챗봇 외에 아무 곳에도 사용되지 않지만, 삭제하고 싶은 경우 언제든지 이 페이지에서 삭제할 수 있어요."
                    imageURL="/img/introduce/secureLogo.png"
                    />

                    <RightImageIntroduceCard 
                    title ="데이터 사용"
                    content ="여러분의 트윗 데이터는 챗봇 사용 외에 그 어떤 곳에도 사용되지 않아요! 이 서버는 개발자의 개인 사비로 운영되고 있어요!"
                    imageURL="/img/introduce/databaseLogo.png"
                    />

                    <Typography variant="caption">
                        2022년 3월 3일 기준, 2792명이 2160027개의 트윗을 학습시켰어요!
                    </Typography>

                </Stack>

                {/* 서비스에 아직 Footer 없는데, 마지막 컴포넌트가 바닥에 딱 붙으면 보기 좀 그러니까 추가해줌*/}
                <Grid item lg ={10} md ={10} sm ={10} xs ={10} sx={{height:"100px"}}/>
            </Grid>
        </Grid>

        <Dialog
        open ={alertTermsOfUseOpen}
        onClose={handleTermsOfUseClose}
        scroll="paper"
        aria-labelledby="alert-dialog-confirm-terms-of-use"
        aria-describedby="alert-dialog-confirm-terms-of-use"
        >
            <DialogTitle id="alert-dialog-title">개인정보처리방침 안내</DialogTitle>
            <DialogContent dividers={true} sx={{
                maxHeight:"500px"
            }}>
                <DialogContentText
                ref={descriptionElementRef}
                tabIndex={-1}
                paragraph={true}
                sx={{
                    whiteSpace:"pre-line"
                }}
                >
                    {termsOfUseText}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleTermsOfUseClose}>거부</Button>
                <Button onClick={handleTermsOfUseAgreeClick} autoFocus>동의</Button>
            </DialogActions>
        </Dialog>

        <Dialog
        open={alertConfirmTweetNotificationDialogOpen}
        onClose={handleAlertClose}
        aria-labelledby="alert-dialog-confirm-twitter-notification"
        aria-describedby="alert-dialog-confirm-twitter-notification"
        >
            <DialogTitle id="alert-dialog-title">트윗 알림 발송 안내</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    트윗 학습은 시간이 조금 걸려요! <br/>
                    학습이 완료된 후, 완료 알림을 트윗으로 보내도 괜찮을까요? <br/>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleAlertClose}>거부</Button>
                <Button onClick={handleServiceAgreeClick} autoFocus>동의</Button>
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

const termsOfUseText = `동의시, 아래 개인정보처리방침에 동의한 것으로 간주합니다.

< 레몬둘 >('https://toolbox.lemondouble.com/'이하 'Lemon Twitter Toolbox')은(는) 「개인정보 보호법」 제30조에 따라 정보주체의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리방침을 수립·공개합니다.

○ 이 개인정보처리방침은 2022년 1월 1부터 적용됩니다.

제1조(개인정보의 처리 목적) < 레몬둘 >('https://toolbox.lemondouble.com/'이하 'Lemon Twitter Toolbox')은(는) 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며 이용 목적이 변경되는 경우에는 「개인정보 보호법」 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.

1. 홈페이지 회원가입 및 관리

회원 가입의사 확인, 회원제 서비스 제공에 따른 본인 식별·인증 목적으로 개인정보를 처리합니다.

2. 서비스 제공

콘텐츠 제공(챗봇 서비스 제공)을 목적으로 개인정보를 처리합니다.


제2조(개인정보의 처리 및 보유 기간)

① < 레몬둘 >은(는) 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.

② 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.

1
관련한 개인정보는 수집.이용에 관한 동의일로부터<3년>까지 위 이용목적을 위하여 보유.이용됩니다.
보유근거 : 회원 가입 데이터 (Twitter Access Token)
관련법령 : 신용정보의 수집/처리 및 이용 등에 관한 기록 : 3년
예외사유 : Twitter 어플리케이션에서 앱 권한 취소하는 방식으로, 데이터를 삭제/무효화 할 수 있습니다.
2
관련한 개인정보는 수집.이용에 관한 동의일로부터<3년>까지 위 이용목적을 위하여 보유.이용됩니다.
보유근거 : 컨텐츠 제공(챗봇)
관련법령 : 신용정보의 수집/처리 및 이용 등에 관한 기록 : 3년
예외사유 : 서비스에서 파기 요청이 가능하고, 파기 요청시 지체없이 파기됩니다.


제3조(개인정보의 제3자 제공)

① < 레몬둘 >은(는) 개인정보를 제1조(개인정보의 처리 목적)에서 명시한 범위 내에서만 처리하며, 정보주체의 동의, 법률의 특별한 규정 등 「개인정보 보호법」 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.

② < 레몬둘 >은(는) 다음과 같이 개인정보를 제3자에게 제공하고 있습니다.

1. < Amazon Web Service Inc(미국) >
개인정보를 제공받는 자 : Amazon Web Service Inc(미국)
제공받는 자의 개인정보 이용목적 : 트윗 데이터
제공받는 자의 보유.이용기간: 3년

제4조(정보주체와 법정대리인의 권리·의무 및 그 행사방법)

① 정보주체는 레몬둘에 대해 언제든지 개인정보 열람·정정·삭제·처리정지 요구 등의 권리를 행사할 수 있습니다.

② 제1항에 따른 권리 행사는레몬둘에 대해 「개인정보 보호법」 시행령 제41조제1항에 따라 서면, 전자우편 등을 통하여 하실 수 있으며 레몬둘은(는) 이에 대해 지체 없이 조치하겠습니다.

③ 제1항에 따른 권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을 통하여 하실 수 있습니다.이 경우 “개인정보 처리 방법에 관한 고시(제2020-7호)” 별지 제11호 서식에 따른 위임장을 제출하셔야 합니다.

④ 개인정보 열람 및 처리정지 요구는 「개인정보 보호법」 제35조 제4항, 제37조 제2항에 의하여 정보주체의 권리가 제한 될 수 있습니다.

⑤ 개인정보의 정정 및 삭제 요구는 다른 법령에서 그 개인정보가 수집 대상으로 명시되어 있는 경우에는 그 삭제를 요구할 수 없습니다.

⑥ 레몬둘은(는) 정보주체 권리에 따른 열람의 요구, 정정·삭제의 요구, 처리정지의 요구 시 열람 등 요구를 한 자가 본인이거나 정당한 대리인인지를 확인합니다.


제5조(처리하는 개인정보의 항목 작성)

① < 레몬둘 >은(는) 다음의 개인정보 항목을 처리하고 있습니다.

1< 홈페이지 회원가입 및 관리 >
필수항목 : 트위터 토큰 (Twitter Access Token)

2< 재화 또는 서비스 제공 >
필수항목 : 트윗 데이터


제6조(개인정보의 파기)


① < 레몬둘 > 은(는) 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.

② 정보주체로부터 동의받은 개인정보 보유기간이 경과하거나 처리목적이 달성되었음에도 불구하고 다른 법령에 따라 개인정보를 계속 보존하여야 하는 경우에는, 해당 개인정보를 별도의 데이터베이스(DB)로 옮기거나 보관장소를 달리하여 보존합니다.

③ 개인정보 파기의 절차 및 방법은 다음과 같습니다.
1. 파기절차
< 레몬둘 > 은(는) 파기 사유가 발생한 개인정보를 선정하고, < 레몬둘 > 의 개인정보 보호책임자의 승인을 받아 개인정보를 파기합니다.

2. 파기방법

전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용합니다



제7조(개인정보의 안전성 확보 조치)

< 레몬둘 >은(는) 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.

1. 개인정보 취급 직원의 최소화 및 교육
개인정보를 취급하는 직원을 지정하고 담당자에 한정시켜 최소화 하여 개인정보를 관리하는 대책을 시행하고 있습니다.

2. 개인정보에 대한 접근 제한
개인정보를 처리하는 데이터베이스시스템에 대한 접근권한의 부여,변경,말소를 통하여 개인정보에 대한 접근통제를 위하여 필요한 조치를 하고 있으며 침입차단시스템을 이용하여 외부로부터의 무단 접근을 통제하고 있습니다.

3. 비인가자에 대한 출입 통제
개인정보를 보관하고 있는 물리적 보관 장소를 별도로 두고 이에 대해 출입통제 절차를 수립, 운영하고 있습니다.

4. 데이터베이스 암호화
데이터베이스를 기술적인 방법(AES-256)으로 암호화하여, 데이터베이스 탈취 등의 문제에 대비하고 있습니다.

제8조(개인정보 자동 수집 장치의 설치•운영 및 거부에 관한 사항)

레몬둘 은(는) 정보주체의 이용정보를 저장하고 수시로 불러오는 ‘쿠키(cookie)’를 사용하지 않습니다.
레몬둘 은(는)  유저 구분을 위한 최소한의 데이터를 제외하고, 정보주체로부터 일체의 정보를 수집하지 않습니다.

제9조 (개인정보 보호책임자)

① 레몬둘 은(는) 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.

▶ 개인정보 보호책임자
성명 :레몬둘
직책 :운영자
직급 :운영자
연락처 : lemondouble2@gmail.com,

※ 개인정보 보호 담당부서로 연결됩니다.

▶ 개인정보 보호 담당부서
부서명 :레몬둘
담당자 :레몬둘
연락처 :, lemondouble2@gmail.com,

② 정보주체께서는 레몬둘 의 서비스(또는 사업)을 이용하시면서 발생한 모든 개인정보 보호 관련 문의, 불만처리, 피해구제 등에 관한 사항을 개인정보 보호책임자 및 담당부서로 문의하실 수 있습니다. 레몬둘 은(는) 정보주체의 문의에 대해 지체 없이 답변 및 처리해드릴 것입니다.

제10조(개인정보 열람청구)
정보주체는 ｢개인정보 보호법｣ 제35조에 따른 개인정보의 열람 청구를 아래의 부서에 할 수 있습니다.
< 레몬둘 >은(는) 정보주체의 개인정보 열람청구가 신속하게 처리되도록 노력하겠습니다.

▶ 개인정보 열람청구 접수·처리 부서
부서명 : 레몬둘
담당자 : 레몬둘
연락처 : , lemondouble2@gmail.com,


제11조(권익침해 구제방법)


정보주체는 개인정보침해로 인한 구제를 받기 위하여 개인정보분쟁조정위원회, 한국인터넷진흥원 개인정보침해신고센터 등에 분쟁해결이나 상담 등을 신청할 수 있습니다. 이 밖에 기타 개인정보침해의 신고, 상담에 대하여는 아래의 기관에 문의하시기 바랍니다.

1. 개인정보분쟁조정위원회 : (국번없이) 1833-6972 (www.kopico.go.kr)
2. 개인정보침해신고센터 : (국번없이) 118 (privacy.kisa.or.kr)
3. 대검찰청 : (국번없이) 1301 (www.spo.go.kr)
4. 경찰청 : (국번없이) 182 (ecrm.cyber.go.kr)

「개인정보보호법」제35조(개인정보의 열람), 제36조(개인정보의 정정·삭제), 제37조(개인정보의 처리정지 등)의 규정에 의한 요구에 대 하여 공공기관의 장이 행한 처분 또는 부작위로 인하여 권리 또는 이익의 침해를 받은 자는 행정심판법이 정하는 바에 따라 행정심판을 청구할 수 있습니다.

※ 행정심판에 대해 자세한 사항은 중앙행정심판위원회(www.simpan.go.kr) 홈페이지를 참고하시기 바랍니다.

제12조(개인정보 처리방침 변경)

① 이 개인정보처리방침은 2022년 3월 7일부터 적용됩니다.
`