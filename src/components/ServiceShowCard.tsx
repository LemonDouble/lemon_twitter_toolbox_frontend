import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import SvgIcon from '@mui/icons-material/DoubleArrow';
import { useNavigate } from 'react-router-dom';
export interface ServiceShowCardProps {
    serviceName : string;
    Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement> & {title?: string | undefined;}>
    cardTitle: string;
    cardContent : string;
    cardURL : string;
}


export default function ServiceShowCard({
    serviceName,
    Icon,
    cardTitle,
    cardContent,
    cardURL,
}: ServiceShowCardProps) {

  const navigate = useNavigate();

  return (
    <Card elevation={3} sx={{ height:"100%", display:"flex", flexDirection:"column", justifyContent:"space-between",}}>
      <CardHeader
        avatar={
          <SvgIcon component={Icon} inheritViewBox />
        }
        title={cardTitle}
        titleTypographyProps={{
          variant:"h4"
        }}
      />
      <CardContent>
        <Typography color="text.secondary" variant='body2'>
          {cardContent}
        </Typography>
      </CardContent>
      <CardActions sx={{display:"flex", justifyContent:"flex-end"}}>
        <IconButton aria-label="move" size="small" onClick={()=> navigate(cardURL)}>
            자세히 보기
            <DoubleArrowIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}