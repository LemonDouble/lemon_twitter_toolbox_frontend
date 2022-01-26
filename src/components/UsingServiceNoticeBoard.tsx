import { Grid, Paper } from "@mui/material";
import { CompactServiceShowCardProps } from "./CompactServiceShowCard";

export interface UsingServiceNoticeBoardProps {
    UsingServiceArray : CompactServiceShowCardProps[],
    BoardHeight : string,
}


export default function UsingServiceNoticeBoard({}:UsingServiceNoticeBoardProps){
    return (
        <Paper sx ={{height:"200px"}}>
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={5.5}>
                </Grid>
                <Grid item xs={5.5}>
                </Grid>
            </Grid>
        </Paper>
        )
}