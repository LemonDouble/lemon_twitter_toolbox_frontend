import { Card, CardMedia, Box, CardContent, Typography } from "@mui/material";

export interface RightImageIntroduceCardProps {
    title : string;
    content : string;
    imageURL : string;
}


export default function RightImageIntroduceCard({title, content, imageURL}:RightImageIntroduceCardProps){
    return(
        <Card sx={{ display: 'flex', width:"100%", justifyContent:"space-between" }}>
            <Box sx={{ display: 'flex', flexDirection: 'column'}}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component="div" variant="h5">
                    {title}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                    {content}
                </Typography>
                </CardContent>
            </Box>
            <CardMedia
                component="img"
                sx={{ width: 151 }}
                image={imageURL}
                alt="Google Logo"
            />
        </Card>
    )
}