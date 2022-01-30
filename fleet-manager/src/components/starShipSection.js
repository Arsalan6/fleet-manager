import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { getTotalCapacity, getFormattedDate } from '../config/util';
import AddToDriveIcon from '@mui/icons-material/AddToDrive';
import { useTranslation } from 'react-i18next';

const StarShipSection = (props) => {
  const {
    starshipList,
    addToFleet,
    onCardClick
  } = props;
  const { t } = useTranslation();

  return (
    starshipList.length ? (
      <Grid container spacing={2}>
        {starshipList.map((starship, index) => {
          return (
            <Grid key={index} item>
              <Card onClick={onCardClick.bind(this, starship)} sx={{ width: 275, height: 270 }} variant="outlined" >
                <CardContent sx={{ height: '80%' }}>
                  <Typography variant="h5">
                    {starship.name}
                  </Typography>
                  <Typography sx={{ mb: 2.5 }} color="text.secondary">
                    {starship.model}
                  </Typography>
                  <Typography sx={{ fontWeight: 'bold' }} variant="body1">
                    {t('labels.class')}: {starship.starship_class}
                  </Typography>
                  <Typography sx={{ fontWeight: 'bold' }} variant="body1">
                    {t('labels.maxCapacity')}: {getTotalCapacity(starship.crew, starship.passengers)}
                  </Typography>
                  <Typography variant="body1">
                    {t('labels.createdOn')}: {getFormattedDate(starship.created)}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "space-between", alignContent: 'center', display: 'flex' }}>
                  <Button fullWidth variant="contained" endIcon={<AddToDriveIcon />} onClick={addToFleet.bind(this, starship)}>{t('labels.addToFleet')}</Button>
                </CardActions>
              </Card>
            </Grid>
          )
        })}
      </Grid>
    ) : (
      <Typography sx={{ flexGrow: 1 }} variant="h6" color="inherit">
        {t('messages.noStartShipsFound')}
      </Typography>
    )
  );
}

StarShipSection.propTypes = {
  starshipList: PropTypes.array.isRequired,
  addToFleet: PropTypes.func.isRequired,
  onCardClick: PropTypes.func.isRequired,
};

export default StarShipSection;