import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useWidth } from "../App";

export interface ResponsiveIntroduceImageContainerProps {
    imageURL : string
}


export default function ResponsiveIntroduceImageContainer({imageURL}:ResponsiveIntroduceImageContainerProps){
    
    const width = useWidth();
    const [introduceImagePercent, setIntroduceImagePercent] = useState("50%");
    
    useEffect(()=> {
        switch(width){
            case "xl":
                setIntroduceImagePercent("25%")
                break;
            case "lg":
            case "md":
                setIntroduceImagePercent("35%")
                break;
            case "sm":
            case "xs":
                setIntroduceImagePercent("50%")
        }
    }, [width])

    return(
        <Box
        component="img"
        src={imageURL}
        alt="Service introduce main image"
        sx={{width :introduceImagePercent, borderRadius: "50%" }}
        >
            
        </Box>
    )
}