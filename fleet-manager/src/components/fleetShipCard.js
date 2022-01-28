import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { getFormattedCapacity } from '../config/util';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTranslation } from 'react-i18next';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 20,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
  },
}));

const FleetShipCard = (props) => {
  const {
    starship
  } = props;
  const { t } = useTranslation();

  return (
    <Grid item>
      <Card sx={{ width: 360 }} variant="outlined" >
        <CardHeader
          action={
            <IconButton>
              <DeleteIcon className="hidden-button" />
            </IconButton>
          }
          title={starship.name}
          subheader={starship.model}
        />
        <CardContent>
          <Typography sx={{ fontWeight: 'bold' }} variant="body1">
            {t('labels.maxCapacity')}: {getFormattedCapacity(starship.crew, starship.passengers)}
          </Typography>
          <Typography sx={{ fontWeight: 'bold', mb: 1 }} variant="body1">
            {t('labels.usedCapacity')}: {starship.used_capacity}
          </Typography>
          <BorderLinearProgress variant="determinate" value={(starship.used_capacity / getFormattedCapacity(starship.crew, starship.passengers)) * 100} />
        </CardContent>
      </Card>
    </Grid>
  );
}

FleetShipCard.propTypes = {
  starship: PropTypes.object.isRequired,
};

export default FleetShipCard;