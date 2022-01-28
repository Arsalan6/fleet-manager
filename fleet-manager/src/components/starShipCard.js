import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { getFormattedCapacity, getFormattedDate } from '../config/util';
import AddToDriveIcon from '@mui/icons-material/AddToDrive';
import { useTranslation } from 'react-i18next';

const StarShipCard = (props) => {
  const {
    starship
  } = props;
  const { t } = useTranslation();

  return (
    <Grid item>
      <Card sx={{ width: 275, height: 270 }} variant="outlined" >
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
            {t('labels.maxCapacity')}: {getFormattedCapacity(starship.crew, starship.passengers)}
          </Typography>
          <Typography variant="body1">
            {t('labels.createdOn')}: {getFormattedDate(starship.created)}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "space-between", alignContent: 'center', display: 'flex' }}>
          <Button fullWidth variant="contained" endIcon={<AddToDriveIcon />}>{t('labels.addToFleet')}</Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

StarShipCard.propTypes = {
  starship: PropTypes.object.isRequired,
};

export default StarShipCard;