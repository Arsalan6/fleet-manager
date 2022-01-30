import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { getFormattedNumber, getTotalCapacity } from '../config/util';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTranslation } from 'react-i18next';
import LinerProgressBar from './linerProgressBar';
import Tooltip from '@mui/material/Tooltip';

const FleetShipSection = (props) => {
  const {
    userFleetList,
    removeFromFleet,
    onCardClick
  } = props;
  const { t } = useTranslation();

  const handleRemoveFromFleet = (shipToBeRemoved, event) => {
    event.stopPropagation();
    removeFromFleet(shipToBeRemoved);
  }

  const getUsedCapacityPercentage = (fleetShip) => {
    return Math.round((fleetShip.used_capacity / getTotalCapacity(fleetShip.crew, fleetShip.passengers, false)) * 100);
  }

  return (
    <>
      {userFleetList.length ? (
        <Grid container spacing={2}>
          {userFleetList.map((fleetShip, index) => {
            return (
              <Grid key={index} item>
                <Card onClick={onCardClick.bind(this, fleetShip)} sx={{ width: 360 }} variant="outlined" >
                  <CardHeader
                    action={
                      <IconButton onClick={handleRemoveFromFleet.bind(this, fleetShip)}>
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
                    <Grid
                      sx={{ mb: 1 }}
                      container
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center" >
                      <Grid item xs={8}>
                        <Typography sx={{ fontWeight: 'bold', mb: 1 }} variant="body1">
                          {t('labels.usedCapacity')}: {getFormattedNumber(fleetShip.used_capacity)}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Tooltip title={getUsedCapacityPercentage(fleetShip) + '%'}>
                      <LinerProgressBar
                        variant="determinate"
                        value={getUsedCapacityPercentage(fleetShip)} />
                    </Tooltip>
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

      )}
    </>
  );
}

FleetShipSection.propTypes = {
  userFleetList: PropTypes.array.isRequired,
  removeFromFleet: PropTypes.func.isRequired,
  onCardClick: PropTypes.func.isRequired,
};

export default FleetShipSection;