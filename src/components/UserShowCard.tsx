import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useEffect, useState } from "react";
export interface UserShowCardProps {
    profileImageUrlPath : string;
    UserName: string;
    UserBio:string;
    FollowingCount : number;
    FollowerCount : number;
}

export default function UserShowCard({
    profileImageUrlPath,
    UserName,
    UserBio,
    FollowingCount,
    FollowerCount }:UserShowCardProps )
{

    useEffect(()=> {
        // 너무 길면 Component 깨져보일 수 있으니 잘라서 표시한다.
        if(UserName.length > 20){
            setShortedUserName(UserName.substring(0,20) + "...")
        }else{
            setShortedUserName(UserName);
        }

        if(UserBio.length > 50){
            setShortedUserBio(UserBio.substring(0, 100) + "...");
        }else{
            setShortedUserBio(UserBio);
        }
    }, [UserName, UserBio])

    const [shortedUserBio, setShortedUserBio] = useState("");
    const [shortedUserName, setShortedUserName] = useState("");

    
    return(
        <Card sx = {{display:'flex', height:"200px" ,justifyContent:"center", alignItems:"center"}}>
            <CardMedia
            component="img"
            sx={{width: "25%", borderRadius:"50%"}}
            image={profileImageUrlPath}
            alt="user profile image"
            />
            <CardContent sx ={{width:"60%"}}>
                <Box sx= {{display: 'flex', flexDirection: "column", alignItems:"center"}}>
                    <Typography variant="h6" align="center">
                        {shortedUserName}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary" component="div">
                        {shortedUserBio}
                    </Typography>
                </Box>
                <Box sx={{display: 'flex', justifyContent: "space-evenly", alignItems: "flex-end"}}>
                    <Box>
                        <Typography variant="subtitle1">
                        팔로잉 :  
                        </Typography>
                        <Typography variant="h6">
                            {FollowingCount}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="subtitle1">
                        팔로워 : 
                        </Typography>
                        <Typography variant="h6">
                            {FollowerCount}
                        </Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    )
}
