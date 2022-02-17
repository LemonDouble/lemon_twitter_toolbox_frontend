import { Stack} from "@mui/material";
import { ChatData } from "./Chatbot";
import ChatMyMessage from "./ChatMyMessage";
import ChatYourMessage from "./ChatYourMessage";

export interface ChatbotBodyProps {
    chatData : ChatData[];
    avatarImageURL: string;
}


export default function ChatbotBody({chatData, avatarImageURL}:ChatbotBodyProps){

    return (
        <Stack spacing={1.5} 
        sx={{width:"100%", height:"500px", paddingLeft:"10px",
         paddingRight:"10px", boxSizing:"border-box", overflowY:"scroll"}}>
            {
                chatData.map((item, index) => {
                    if(item.isMyChat){
                        return <ChatMyMessage key={index} Message={item.Message}/>
                    }
                    if(!item.isMyChat){
                        return <ChatYourMessage key={index} avatarImageURL={avatarImageURL} Message={item.Message}/>
                    }

                    return <></>
                })
            }
        </Stack>
        )
}