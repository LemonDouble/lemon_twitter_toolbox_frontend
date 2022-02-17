import { Button, Stack, TextField } from "@mui/material"
import SendIcon from '@mui/icons-material/Send';

export interface ChatbotInputSpaceProps {
}


export default function ChatbotInputSpace({}:ChatbotInputSpaceProps){

    return(
        <Stack direction="row" sx={{width:"100%"}}>
            <TextField id="filled-basic" label="물어볼 말을 써 주세요!" variant="filled"
            sx={{flexGrow:1}}
            
            />
            <Button variant="contained" endIcon={<SendIcon />}>
                보내기
            </Button>
        </Stack>
    )
}