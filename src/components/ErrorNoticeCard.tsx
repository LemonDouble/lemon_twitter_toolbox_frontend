import { CardContent, CardHeader, Typography, Card, CardActions, IconButton, Divider, Box } from "@mui/material"
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';

export interface ErrorNoticeCardProps {
    errorMessage? : string,
}

export default function ErrorNoticeCard({
    errorMessage = "뭔가 잘못된 것 같아요."
    }:ErrorNoticeCardProps){
    return(
        <Card sx={{maxWidth : 600 ,height : "400px" ,display: "flex", flexDirection: "column", justifyContent:"space-between"}}>
            <Box>
                <CardHeader
                title = "저런!"
                titleTypographyProps={{
                    variant:"h3"
                    }}>
                </CardHeader>
                <Divider />
            </Box>
            <CardContent>
                <Typography variant="h6">
                    {errorMessage}
                </Typography>
            </CardContent>
            <CardActions sx={{display:"flex", justifyContent:"flex-end"}}>
                <IconButton aria-label="move" size="small" href="/">
                        홈 화면으로 돌아가기
                        <DoubleArrowIcon />
                </IconButton>
            </CardActions>
        </Card>
    )
}