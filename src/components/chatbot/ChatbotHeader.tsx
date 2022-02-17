import { Avatar, Stack, Typography } from "@mui/material";

export interface ChatbotHeaderProps {
    avatarImageURL : string;
    userName : string;
}


export default function ChatbotHeader({avatarImageURL,userName}:ChatbotHeaderProps){
    return (
        <Stack direction="row" spacing={2} sx={{
            paddingLeft:"10px",
            paddingTop:"10px",
            alignItems:"center"
        }}>
            <Avatar src={avatarImageURL} />
            <Typography variant="body1" sx={{
                display:"flex",
                alignItems:"center",
            }}>사이버{userName}과의 대화</Typography>
        </Stack>
    )
}