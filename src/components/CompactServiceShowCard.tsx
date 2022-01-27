import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import SmartToyIcon from '@mui/icons-material/SmartToy';

export interface CompactServiceShowCardProps {
    serviceName : string;
    cardLogoImgPath : string;
    cardTitle: string;
    cardURL : string;
}


export default function CompactServiceShowCard({
    cardLogoImgPath,
    cardTitle,
    cardURL,
}: CompactServiceShowCardProps) {

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