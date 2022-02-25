import { Breadcrumbs, Link, Typography } from "@mui/material";

export interface BreadcrumbsData{
    title : string;
    href : string;
    isLink : boolean;
}

export interface BasicBreadcrumbsProps {
    pathData : BreadcrumbsData[]
}


export default function BasicBreadcrumbs({pathData}:BasicBreadcrumbsProps){
    return(
        <Breadcrumbs aria-label="breadcrumb">
            {
                pathData.map(((item,index) => {
                    if(item.isLink){
                        return(
                            <Link underline="hover" color="inherit" href={item.href} key={index}>
                                {item.title}
                            </Link>
                        )
                    }

                    return <Typography color="text.primary" key={index}>{item.title}</Typography>
                }))
            }
        </Breadcrumbs>
    )
}