import { Divider, Grid, Paper, Stack } from "@mui/material";
import { useState } from "react";
import { UserProfile } from "../../hooks/useServerProfile";
import ChatbotBody from "./ChatbotBody";
import ChatbotHeader from "./ChatbotHeader";
import ChatbotInputSpace from "./ChatbotInputSpace";

export interface ChatbotProps {
    userData: UserProfile;
}

export interface ChatData{
    isMyChat: boolean;
    isImage: boolean;
    Message : string;
}


export default function Chatbot({userData}:ChatbotProps){

    const [chatData, setChatData] = useState<ChatData[]>([
    {
        isMyChat : false,
        isImage : false,
        Message : "안녕하세요! 저는 당신의 트윗을 학습한 인공지능 로봇입니다!!"
    },{
        isMyChat : false,
        isImage : false,
        Message : "이제부터 제가 당신의 여러 질문에 대한 답변을 할 거에요. 단, 첫 질문의 답변은 기술적인 문제로 조금 오래 걸릴 수 있어요."
    },{
        isMyChat : false,
        isImage : false,
        Message : "그러면, 아래 채팅창에 아무 질문이나 적어 주세요!"
    },])

    const appendChatData = (appendData :ChatData[]) =>{
        setChatData([...chatData, ...appendData])
    }


    
    return (
        <Paper component={Grid} item container lg ={6} md ={6} sm ={10} xs ={10} 
        variant="outlined">
            <Stack spacing={1} sx={{width:"100%"}}>
                <ChatbotHeader 
                avatarImageURL={userData.profile_image_url}
                userName={userData.screen_nickname}
                />
                <Divider />
                <ChatbotBody
                chatData={chatData}
                avatarImageURL={userData.profile_image_url}
                />
                <ChatbotInputSpace
                appendChatData={appendChatData}
                ></ChatbotInputSpace>
            </Stack>
        </Paper>
    )
}