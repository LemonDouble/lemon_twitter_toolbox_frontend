import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { Box } from '@mui/material';

export interface CompactProductionShowCardProps {
    cardLogoImgPath : string;
    cardTitle: string;
    cardContent : string;
    cardURL : string;
}


export default function CompactProductionShowCard({
    cardLogoImgPath,
    cardTitle,
    cardURL,
}: CompactProductionShowCardProps) {

  return (
    <Card sx={{ maxWidth: 345 , verticalAlign: 'center'}}>
      <CardHeader
        avatar={
          <Avatar src={cardLogoImgPath} aria-label="productLogo" />
        }
        title={cardTitle}
        titleTypographyProps={{
          variant:"h6"
        }}
        action={
          <IconButton aria-label="settings" href={cardURL}>
            <DoubleArrowIcon />
          </IconButton>
          }
      />
    </Card>
  );
}