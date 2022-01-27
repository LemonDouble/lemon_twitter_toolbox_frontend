import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import SvgIcon from '@mui/icons-material/DoubleArrow';

export interface CompactServiceShowCardProps {
    serviceName : string;
    Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement> & {title?: string | undefined;}>
    cardTitle: string;
    cardURL : string;
}


export default function CompactServiceShowCard({
    Icon,
    cardTitle,
    cardURL,
}: CompactServiceShowCardProps) {


  return (
    <Card sx={{verticalAlign: 'center'}}>
      <CardHeader
        avatar={
          <SvgIcon component={Icon} inheritViewBox />
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