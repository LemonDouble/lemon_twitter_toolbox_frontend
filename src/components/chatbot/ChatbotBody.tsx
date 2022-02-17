import { Stack} from "@mui/material";
import { useEffect, useRef } from "react";
import { ChatData } from "./Chatbot";
import ChatMyMessage from "./ChatMyMessage";
import ChatYourImage from "./ChatYourImage";
import ChatYourMessage from "./ChatYourMessage";

export interface ChatbotBodyProps {
    chatData : ChatData[];
    avatarImageURL: string;
}


export default function ChatbotBody({chatData, avatarImageURL}:ChatbotBodyProps){

    const scrollDownRef = useRef<HTMLUListElement>();

    useEffect(()=>{
        if(scrollDownRef.current){
            scrollDownRef.current.scrollTop = scrollDownRef.current.scrollHeight;
        }
    },[chatData])


    return (
        <Stack spacing={1.5} 
        sx={{width:"100%", height:"500px", paddingLeft:"10px",
         paddingRight:"10px", boxSizing:"border-box", overflowY:"scroll"}}
         ref={scrollDownRef}
         >
            {
                chatData.map((item, index) => {
                    if(item.isMyChat){
                        return <ChatMyMessage key={index} Message={item.Message}/>
                    }
                    if(!item.isMyChat && !item.isImage){
                        return <ChatYourMessage key={index} avatarImageURL={avatarImageURL} Message={item.Message}/>
                    }

                    if(!item.isMyChat && item.isImage){
                        return <ChatYourImage key={index} avatarImageURL={avatarImageURL} imageURL={item.Message}/>
                    }

                })
            }
        </Stack>
        )
}