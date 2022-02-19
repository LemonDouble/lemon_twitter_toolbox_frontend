import { CircularProgress, Stack, Typography } from "@mui/material";

export interface LoadingComponentProps {
    loadingMessage:string;
}


export default function LoadingComponent({loadingMessage}:LoadingComponentProps){

    return(
        <Stack spacing={2} sx={{
                alignItems:"center"
            }}>
                <CircularProgress />
                <Typography variant="body1">{loadingMessage}</Typography>
        </Stack>
    )
}