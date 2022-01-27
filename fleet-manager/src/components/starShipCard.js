import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { getFormattedCapacity, getFormattedDate } from '../config/util';
import AddToDriveIcon from '@mui/icons-material/AddToDrive';

const StarShipCard = (props) => {
  const {
    starship
  } = props;

  return (
    <Grid item>
      <Card sx={{ width: 275, height: 270 }} variant="outlined" >
        <CardContent sx={{ height: '80%'}}>
          <Typography variant="h5">
            {starship.name}
          </Typography>
          <Typography sx={{ mb: 2.5 }} color="text.secondary">
            {starship.model}
          </Typography>
          <Typography sx={{fontWeight: 'bold'}} variant="body1">
            Class: {starship.starship_class}
          </Typography>
          <Typography sx={{fontWeight: 'bold'}} variant="body1">
            Max. Capacity: {getFormattedCapacity(starship.crew, starship.passengers)}
          </Typography>
          <Typography variant="body1">
            Created On: {getFormattedDate(starship.created)}
          </Typography>
        </CardContent>
        <CardActions sx={{  justifyContent: "space-between", alignContent: 'center', display: 'flex' }}>
        <Button fullWidth variant="contained" endIcon={<AddToDriveIcon />}>Add to Fleet</Button>

        </CardActions>
      </Card>
    </Grid>
  );
}

StarShipCard.propTypes = {
  starship: PropTypes.object.isRequired,
};

export default StarShipCard;