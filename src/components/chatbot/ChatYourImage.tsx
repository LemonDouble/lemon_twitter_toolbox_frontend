import { Avatar, Paper, Stack, Typography } from "@mui/material";

export interface ChatYourImageProps {
    avatarImageURL : string;
    imageURL : string;
}


export default function ChatYourImage({avatarImageURL, imageURL}:ChatYourImageProps){

    return(
        <Stack direction="row" spacing={2}>
            <Avatar src={avatarImageURL} />
            <img src={imageURL} style={{width:"50%"}}/>
        </Stack>
    )
}