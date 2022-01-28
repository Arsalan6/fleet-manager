import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { getTotalCapacity } from '../config/util';
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

const FleetShipSection = (props) => {
  const {
    userFleetList,
    removeFromFleet,
  } = props;
  const { t } = useTranslation();

  return (
    userFleetList.length ? (
      <Grid container spacing={2}>
        {userFleetList.map((fleetShip, index) => {
          return (
            <Grid key={index} item>
              <Card sx={{ width: 360 }} variant="outlined" >
                <CardHeader
                  action={
                    <IconButton onClick={removeFromFleet.bind(this, fleetShip)}>
                      <DeleteIcon className="hidden-button" />
                    </IconButton>
                  }
                  title={fleetShip.name}
                  subheader={fleetShip.model}
                />
                <CardContent>
                  <Typography sx={{ fontWeight: 'bold' }} variant="body1">
                    {t('labels.maxCapacity')}: {getTotalCapacity(fleetShip.crew, fleetShip.passengers)}
                  </Typography>
                  <Typography sx={{ fontWeight: 'bold', mb: 1 }} variant="body1">
                    {t('labels.usedCapacity')}: {fleetShip.used_capacity}
                  </Typography>
                  <BorderLinearProgress variant="determinate" value={(fleetShip.used_capacity / getTotalCapacity(fleetShip.crew, fleetShip.passengers, false)) * 100} />
                </CardContent>
              </Card>
            </Grid>
          )
        })}
      </Grid>
    ) : (
      <Typography sx={{ flexGrow: 1 }} variant="body2" color="inherit">
        {t('messages.yourFleetIsEmptyAddShips')}
      </Typography>

    )
  );
}

FleetShipSection.propTypes = {
  userFleetList: PropTypes.array.isRequired,
  removeFromFleet: PropTypes.func.isRequired
};

export default FleetShipSection;