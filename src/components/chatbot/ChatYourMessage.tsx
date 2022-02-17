import { Avatar, Paper, Stack, Typography } from "@mui/material";

export interface ChatYourMessageProps {
    avatarImageURL : string;
    Message : string;
}


export default function ChatYourMessage({avatarImageURL, Message}:ChatYourMessageProps){
    return(
        <Stack direction="row" spacing={2}>
            <Avatar src={avatarImageURL} />
            <Paper component={Typography} 
            sx={{
                padding:"5px", display:"flex", alignItems:"center"
                }}>
                    {Message}
            </Paper>
        </Stack>
    )
}