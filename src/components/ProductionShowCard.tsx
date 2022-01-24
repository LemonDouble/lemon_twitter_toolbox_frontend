import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';

export interface ProductionShowCardProps {
    cardLogoImgPath : string;
    cardTitle: string;
    cardContent : string;
    cardURL : string;
}


export default function ProductionShowCard({
    cardLogoImgPath,
    cardTitle,
    cardContent,
    cardURL,
}: ProductionShowCardProps) {

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar src={cardLogoImgPath} aria-label="productLogo" />
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
        <IconButton aria-label="move" size="small">
            바로 사용해보기!
            <DoubleArrowIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}