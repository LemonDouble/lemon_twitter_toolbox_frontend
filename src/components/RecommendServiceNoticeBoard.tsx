import { Grid, Paper } from "@mui/material";
import ServiceShowCard, { ServiceShowCardProps } from "./ServiceShowCard";
//import { useEffect, useState } from "react";
//import { useWidth } from "../App";

export interface RecommendServiceNoticeBoardProps {
    UsingServiceArray : ServiceShowCardProps[],
}


export default function RecommendServiceNoticeBoard({UsingServiceArray}:RecommendServiceNoticeBoardProps){

    /* TODO : 현재는 필터링 할 만큼 서비스가 많지 않다!
    // Media Query (가로 길이) 에 따라서 보이는 개수를 수정한다.
    const [showServiceCard, setshowServiceCard] =useState<ServiceShowCardProps[]>([]);

    const width = useWidth();

    useEffect(()=> {
        switch(width){
            case "xl":
                // xl은 최대 3개까지 가능, 단, 마지막 한 칸은 더 보기.. 자리이므로 최대 5개까지
                setshowServiceCard(UsingServiceArray.slice(0,3))
                break;
            case "lg":
            case "md":
                // lg, md는 2개까지
                setshowServiceCard(UsingServiceArray.slice(0,2))
                break;
            case "sm":
            case "xs":
                // sm, xs는 1개까지
                setshowServiceCard(UsingServiceArray.slice(0,1))
        }
    }, [UsingServiceArray, width])
    */

    return(
        <Paper component={Grid} container item>
            <Grid container item alignContent="center"
            spacing={2} p="10px">
                {UsingServiceArray.map((item, index) => (
                <Grid item key ={index} xl={4} lg={6} md = {6} sm={12} xs={12}>
                    <ServiceShowCard
                    key ={index}
                    serviceName={item.serviceName}
                    Icon={item.Icon}
                    cardTitle={item.cardTitle}
                    cardContent={item.cardContent}
                    cardURL={item.cardURL}
                    />
                </Grid>
                ))
                }
            </Grid>
        </Paper>
    )
}