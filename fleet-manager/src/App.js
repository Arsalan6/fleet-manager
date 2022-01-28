import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import TopBar from './components/topbar';
import StarShipCard from './components/starShipCard';
import { teal } from '@mui/material/colors';
import FleetShipCard from './components/fleetShipCard';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStarShipListStart } from './redux/starship/starship.actions';
import StarShipCardLoader from './components/starShipCardLoader';

function App() {
  const dispatch = useDispatch();
  const [toggleDark, setToggleDark] = useState(false);
  const { t } = useTranslation();
  const handleToggleChange = () => {
    setToggleDark(!toggleDark);
  }
  // Todo: Maybe move theme to a separate file.
  const theme = createTheme({
    palette: {
      primary: {
        main: teal[500],
      },
      mode: toggleDark ? 'dark' : 'light',
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            "& .hidden-button": {
              display: "none"
            },
            "&:hover .hidden-button": {
              display: "flex"
            }
          }
        }
      }
    },
  });

  // Todo: Remove dummy data once API is added.
  const Starships = [
    {
      "used_capacity": '100',
      "name": "CR90 corvette",
      "model": "CR90 corvette",
      "manufacturer": "Corellian Engineering Corporation",
      "cost_in_credits": "3500000",
      "length": "150",
      "max_atmosphering_speed": "950",
      "crew": "30-165",
      "passengers": "600",
      "cargo_capacity": "3000000",
      "consumables": "1 year",
      "hyperdrive_rating": "2.0",
      "MGLT": "60",
      "starship_class": "corvette",
      "pilots": [],
      "films": [
        "https://swapi.dev/api/films/1/",
        "https://swapi.dev/api/films/3/",
        "https://swapi.dev/api/films/6/"
      ],
      "created": "2014-12-10T14:20:33.369000Z",
      "edited": "2014-12-20T21:23:49.867000Z",
      "url": "https://swapi.dev/api/starships/2/"
    },
    {
      "used_capacity": '0',
      "name": "Star Destroyer",
      "model": "Imperial I-class Star Destroyer",
      "manufacturer": "Kuat Drive Yards",
      "cost_in_credits": "150000000",
      "length": "1,600",
      "max_atmosphering_speed": "975",
      "crew": "47,060",
      "passengers": "n/a",
      "cargo_capacity": "36000000",
      "consumables": "2 years",
      "hyperdrive_rating": "2.0",
      "MGLT": "60",
      "starship_class": "Star Destroyer",
      "pilots": [],
      "films": [
        "https://swapi.dev/api/films/1/",
        "https://swapi.dev/api/films/2/",
        "https://swapi.dev/api/films/3/"
      ],
      "created": "2014-12-10T15:08:19.848000Z",
      "edited": "2014-12-20T21:23:49.870000Z",
      "url": "https://swapi.dev/api/starships/3/"
    },
    {
      "used_capacity": '30',
      "name": "Sentinel-class landing craft",
      "model": "Sentinel-class landing craft",
      "manufacturer": "Sienar Fleet Systems, Cyngus Spaceworks",
      "cost_in_credits": "240000",
      "length": "38",
      "max_atmosphering_speed": "1000",
      "crew": "5",
      "passengers": "75",
      "cargo_capacity": "180000",
      "consumables": "1 month",
      "hyperdrive_rating": "1.0",
      "MGLT": "70",
      "starship_class": "landing craft",
      "pilots": [],
      "films": [
        "https://swapi.dev/api/films/1/"
      ],
      "created": "2014-12-10T15:48:00.586000Z",
      "edited": "2014-12-20T21:23:49.873000Z",
      "url": "https://swapi.dev/api/starships/5/"
    },
    {
      "used_capacity": '1000',
      "name": "Death Star",
      "model": "DS-1 Orbital Battle Station",
      "manufacturer": "Imperial Department of Military Research, Sienar Fleet Systems",
      "cost_in_credits": "1000000000000",
      "length": "120000",
      "max_atmosphering_speed": "n/a",
      "crew": "342,953",
      "passengers": "843,342",
      "cargo_capacity": "1000000000000",
      "consumables": "3 years",
      "hyperdrive_rating": "4.0",
      "MGLT": "10",
      "starship_class": "Deep Space Mobile Battlestation",
      "pilots": [],
      "films": [
        "https://swapi.dev/api/films/1/"
      ],
      "created": "2014-12-10T16:36:50.509000Z",
      "edited": "2014-12-20T21:26:24.783000Z",
      "url": "https://swapi.dev/api/starships/9/"
    },
    {
      "used_capacity": '0',
      "name": "Millennium Falcon",
      "model": "YT-1300 light freighter",
      "manufacturer": "Corellian Engineering Corporation",
      "cost_in_credits": "100000",
      "length": "34.37",
      "max_atmosphering_speed": "1050",
      "crew": "4",
      "passengers": "6",
      "cargo_capacity": "100000",
      "consumables": "2 months",
      "hyperdrive_rating": "0.5",
      "MGLT": "75",
      "starship_class": "Light freighter",
      "pilots": [
        "https://swapi.dev/api/people/13/",
        "https://swapi.dev/api/people/14/",
        "https://swapi.dev/api/people/25/",
        "https://swapi.dev/api/people/31/"
      ],
      "films": [
        "https://swapi.dev/api/films/1/",
        "https://swapi.dev/api/films/2/",
        "https://swapi.dev/api/films/3/"
      ],
      "created": "2014-12-10T16:59:45.094000Z",
      "edited": "2014-12-20T21:23:49.880000Z",
      "url": "https://swapi.dev/api/starships/10/"
    },
    {
      "used_capacity": '0',
      "name": "Y-wing",
      "model": "BTL Y-wing",
      "manufacturer": "Koensayr Manufacturing",
      "cost_in_credits": "134999",
      "length": "14",
      "max_atmosphering_speed": "1000km",
      "crew": "2",
      "passengers": "0",
      "cargo_capacity": "110",
      "consumables": "1 week",
      "hyperdrive_rating": "1.0",
      "MGLT": "80",
      "starship_class": "assault starfighter",
      "pilots": [],
      "films": [
        "https://swapi.dev/api/films/1/",
        "https://swapi.dev/api/films/2/",
        "https://swapi.dev/api/films/3/"
      ],
      "created": "2014-12-12T11:00:39.817000Z",
      "edited": "2014-12-20T21:23:49.883000Z",
      "url": "https://swapi.dev/api/starships/11/"
    },
    {
      "used_capacity": '0',
      "name": "X-wing",
      "model": "T-65 X-wing",
      "manufacturer": "Incom Corporation",
      "cost_in_credits": "149999",
      "length": "12.5",
      "max_atmosphering_speed": "1050",
      "crew": "1",
      "passengers": "0",
      "cargo_capacity": "110",
      "consumables": "1 week",
      "hyperdrive_rating": "1.0",
      "MGLT": "100",
      "starship_class": "Starfighter",
      "pilots": [
        "https://swapi.dev/api/people/1/",
        "https://swapi.dev/api/people/9/",
        "https://swapi.dev/api/people/18/",
        "https://swapi.dev/api/people/19/"
      ],
      "films": [
        "https://swapi.dev/api/films/1/",
        "https://swapi.dev/api/films/2/",
        "https://swapi.dev/api/films/3/"
      ],
      "created": "2014-12-12T11:19:05.340000Z",
      "edited": "2014-12-20T21:23:49.886000Z",
      "url": "https://swapi.dev/api/starships/12/"
    },
    {
      "used_capacity": '0',
      "name": "TIE Advanced x1",
      "model": "Twin Ion Engine Advanced x1",
      "manufacturer": "Sienar Fleet Systems",
      "cost_in_credits": "unknown",
      "length": "9.2",
      "max_atmosphering_speed": "1200",
      "crew": "1",
      "passengers": "0",
      "cargo_capacity": "150",
      "consumables": "5 days",
      "hyperdrive_rating": "1.0",
      "MGLT": "105",
      "starship_class": "Starfighter",
      "pilots": [
        "https://swapi.dev/api/people/4/"
      ],
      "films": [
        "https://swapi.dev/api/films/1/"
      ],
      "created": "2014-12-12T11:21:32.991000Z",
      "edited": "2014-12-20T21:23:49.889000Z",
      "url": "https://swapi.dev/api/starships/13/"
    },
    {
      "used_capacity": '0',
      "name": "Executor",
      "model": "Executor-class star dreadnought",
      "manufacturer": "Kuat Drive Yards, Fondor Shipyards",
      "cost_in_credits": "1143350000",
      "length": "19000",
      "max_atmosphering_speed": "n/a",
      "crew": "279,144",
      "passengers": "38000",
      "cargo_capacity": "250000000",
      "consumables": "6 years",
      "hyperdrive_rating": "2.0",
      "MGLT": "40",
      "starship_class": "Star dreadnought",
      "pilots": [],
      "films": [
        "https://swapi.dev/api/films/2/",
        "https://swapi.dev/api/films/3/"
      ],
      "created": "2014-12-15T12:31:42.547000Z",
      "edited": "2014-12-20T21:23:49.893000Z",
      "url": "https://swapi.dev/api/starships/15/"
    },
    {
      "used_capacity": '0',
      "name": "Rebel transport",
      "model": "GR-75 medium transport",
      "manufacturer": "Gallofree Yards, Inc.",
      "cost_in_credits": "unknown",
      "length": "90",
      "max_atmosphering_speed": "650",
      "crew": "6",
      "passengers": "90",
      "cargo_capacity": "19000000",
      "consumables": "6 months",
      "hyperdrive_rating": "4.0",
      "MGLT": "20",
      "starship_class": "Medium transport",
      "pilots": [],
      "films": [
        "https://swapi.dev/api/films/2/",
        "https://swapi.dev/api/films/3/"
      ],
      "created": "2014-12-15T12:34:52.264000Z",
      "edited": "2014-12-20T21:23:49.895000Z",
      "url": "https://swapi.dev/api/starships/17/"
    }
  ]

  const [searchQuery, setSearchQuery] = useState(null);
  useEffect(() => {
    dispatch(
      fetchStarShipListStart({
        searchParam: searchQuery,
      })
    );
  }, [dispatch, searchQuery]);

  const handleSearchBarChange = (event) => {
    setSearchQuery(event.target.value);
  }

  const starship = useSelector((state) => state.starship);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* TopBar */}
      <TopBar
        isDark={toggleDark}
        onToggleChange={handleToggleChange}
      />
      {/* End TopBar */}
      {/* Main Section */}
      <Grid sx={{ p: '2rem' }}
        container spacing={2}>
        <Grid item xs={12} sm={9} md={6} lg={8}>
          <Typography fontWeight={600} sx={{ flexGrow: 1 }} variant="h5" color="inherit">
            {t('labels.searchStarShips')}
          </Typography>
          <TextField sx={{ marginTop: '1rem', width: '26rem', marginBottom: '1rem' }} id="outlined-basic" placeholder="Enter Starship name" variant="outlined" fullWidth onChange={handleSearchBarChange} />
          {starship.loading ? (
            <Grid container spacing={2}>
              {Array.from(new Array(4)).map((item, index) => (
                <StarShipCardLoader key={index} />
              ))}
            </Grid>
          ) : (
            starship.error ? (
              <Typography sx={{ flexGrow: 1 }} variant="h4" color="inherit">
                {t('messages.noStartShipsFound')}
              </Typography>
            ) : (
              <StarShipCard
                starshipList={starship.starshipList}
              />
            ))
          }
        </Grid>
        <Grid item xs={12} sm={3} lg={4}>
          <Typography fontWeight={600} sx={{ flexGrow: 1, mb: 2 }} variant="h5" color="inherit">
            {t('labels.yourFleet')}
          </Typography>
          <Typography sx={{ fontWeight: 'bold' }} variant="body1">
            {t('labels.totalFleetCapacity')}: 1000000
          </Typography>
          <Typography sx={{ fontWeight: 'bold', mb: '1.5rem' }} variant="body1">
            {t('labels.usedFleetCapacity')}: 3000
          </Typography>
          <Grid container spacing={2}>
            {Starships.map((starship, index) => {
              return (
                <FleetShipCard
                  key={index}
                  starship={starship}
                />
              )
            })}
          </Grid>
          {/* <Typography sx={{ flexGrow: 1 }} variant="body2" color="inherit">
            {t('messages.yourFleetIsEmptyAddShips')}
          </Typography> */}
        </Grid>
      </Grid>
      {/* End Main Section */}
    </ThemeProvider>
  );
}

export default App;
