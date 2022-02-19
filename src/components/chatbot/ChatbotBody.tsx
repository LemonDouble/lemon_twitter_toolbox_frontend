import { Stack} from "@mui/material";
import React ,{ useEffect, useRef } from "react";
import { ChatData } from "./Chatbot";
import ChatMyMessage from "./ChatMyMessage";
import ChatYourImage from "./ChatYourImage";
import ChatYourMessage from "./ChatYourMessage";

export interface ChatbotBodyProps {
    chatData : ChatData[];
    avatarImageURL: string;
}


export default function ChatbotBody({chatData, avatarImageURL}:ChatbotBodyProps){

    const scrollDownRef = useRef<HTMLDivElement>(null);

    useEffect(
        ()=>{
        if(scrollDownRef.current){
            return scrollDownRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    },[chatData])


    return (
        <Stack spacing={1.5} 
        sx={{width:"100%", height:"500px", paddingLeft:"10px",
         paddingRight:"10px", boxSizing:"border-box", overflowY:"scroll"}}
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
                    
                    return <></>
                })
            }
            <div ref={scrollDownRef} />
        </Stack>
        )
}