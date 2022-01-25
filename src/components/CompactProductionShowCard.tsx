import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import SmartToyIcon from '@mui/icons-material/SmartToy';

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
    <Card sx={{verticalAlign: 'center'}}>
      <CardHeader
        avatar={
          <SmartToyIcon />
        }
        title={cardTitle}
        titleTypographyProps={{
          variant:"body1"
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