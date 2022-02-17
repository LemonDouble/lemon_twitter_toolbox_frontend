import { Paper, Stack, Theme, Typography, useTheme } from "@mui/material";

export interface ChatMyMessageProps {
    Message : string;
}


export default function ChatMyMessage({ Message}:ChatMyMessageProps){
    const theme :Theme = useTheme();
    const myColor = theme.palette.mode === "dark" ? "#336699" : "#70abe5"
    
    return(
        <Stack direction="row" sx={{justifyContent:"flex-end"}}>
            <Paper component={Typography} 
            sx={{
                padding:"5px", display:"flex", alignItems:"center", background:myColor
                }}>
                    {Message}
            </Paper>
        </Stack>
    )
}