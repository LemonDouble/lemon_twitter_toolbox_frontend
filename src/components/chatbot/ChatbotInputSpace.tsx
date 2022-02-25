import { Button, CircularProgress, Stack, TextField } from "@mui/material"
import SendIcon from '@mui/icons-material/Send';
import React, { useState } from "react";
import axios from "axios";

export interface ChatbotInputSpaceProps {
    appendChatData:Function
}


export default function ChatbotInputSpace({appendChatData}:ChatbotInputSpaceProps){

    // 입력 TextField의 값 state
    const [textFieldValue, setTextFieldValue] = useState('');
    // 입력 TextField의 Error와 도움 text State
    const [textFieldError, setTextFieldError] = useState({
        isError: false,
        helperText: ""
    });
    const [isLoading, setisLoading] = useState(false);


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTextFieldValue(event.target.value);
        setTextFieldError({
        isError: false,
        helperText: ""
    })
    }

    const onEnterKeyPress = (event:React.KeyboardEvent) => {
        if(event.code === 'Enter'){
            onSendClick();
        }
    }

    const onSendClick = async () => {
        if(textFieldValue === ''){
            setTextFieldError({isError: true, helperText: "질문을 쓴 후 전송 버튼을 눌러주세요!"});
            return;
        }

        const newData = []
        newData.push({
            isMyChat : true,
            isImage : false,
            Message : textFieldValue
        })
        appendChatData(newData)
        setisLoading(true);

        const question = textFieldValue;
        const result = await axios.post("https://aq44ubvx8l.execute-api.ap-northeast-1.amazonaws.com/dev/question",{
            question: question
        })

        const data = typeof(result.data)==='string' ? JSON.parse(result.data.replace(/\bNaN\b/g, "null")) : result.data;
        // 문자열로 온 true/false를 boolean으로
        data.answer_hasPhoto = data.answer_hasPhoto === "true" ? true : false;

        if(data.answer_string !== null){
            newData.push({
                isMyChat : false,
                isImage : false,
                Message : data.answer_string
            })
            appendChatData(newData);
        }

        if(data.answer_hasPhoto){
            // 사진 1장
            if(typeof(data.answer_photoURL) === "string"){
                data.answer_photoURL = [data.answer_photoURL]
            }


            newData.push(...data.answer_photoURL.map((url:string) =>{
                return{
                    isMyChat: false,
                    isImage: true,
                    Message: url
                }
            }))

            appendChatData(newData);
        }

        
        setTextFieldValue('');
        setisLoading(false);
    }
    
    return(
        <Stack direction="row" sx={{width:"100%"}}>
            <TextField id="filled-basic" label="물어볼 말을 써 주세요!" variant="filled"
            sx={{flexGrow:1}}
            value={textFieldValue}
            onChange={handleChange}
            onKeyDown={onEnterKeyPress}
            error={textFieldError.isError}
            helperText={textFieldError.helperText}
            disabled={isLoading}
            />
            <Button variant="contained" endIcon={isLoading? <CircularProgress /> :<SendIcon />}
            onClick={onSendClick}
            disabled={isLoading}
            >
                {isLoading ? "연산중" : "보내기"}
            </Button>
        </Stack>
    )
}