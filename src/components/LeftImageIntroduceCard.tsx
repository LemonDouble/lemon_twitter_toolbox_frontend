import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";

export interface LeftImageIntroduceCardProps {
    title : string;
    content : string;
    imageURL : string;
}


export default function LeftImageIntroduceCard({title, content, imageURL}:LeftImageIntroduceCardProps){
    
    return(
        <Card sx={{ display: 'flex', width:"100%", justifyContent:"space-between" }}>
            <CardMedia
                component="img"
                sx={{ width: 151 }}
                image={imageURL}
                alt="Google Logo"
            />
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
        </Card>
    )
}