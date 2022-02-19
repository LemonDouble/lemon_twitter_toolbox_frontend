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
                pathData.map((item => {
                    if(item.isLink){
                        return(
                            <Link underline="hover" color="inherit" href={item.href}>
                                {item.title}
                            </Link>
                        )
                    }

                    return <Typography color="text.primary">{item.title}</Typography>
                }))
            }
        </Breadcrumbs>
    )
}