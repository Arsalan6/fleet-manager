import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';

const StarShipCardLoader = () => {

  return (
    <Grid item>
      <Card sx={{ width: 275, height: 270 }} variant="outlined" >
        <CardContent sx={{ height: '80%' }}>
          <Skeleton variant="rectangular" height={34} />
          <Skeleton width="60%" variant="text" />
          <Skeleton width="50%" variant="text" />
        </CardContent>
        <CardActions sx={{ justifyContent: "space-between", alignContent: 'center', display: 'flex' }}>
          <Skeleton width="100%" height={38} variant="rectangular" />
        </CardActions>
      </Card>
    </Grid>
  );
}

export default StarShipCardLoader;