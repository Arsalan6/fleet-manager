import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import TopBar from './components/topbar';
import StarShipCard from './components/starShipCard';
import { teal } from '@mui/material/colors';
import FleetShipSection from './components/fleetShipSection';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { addStarshipInFleet, fetchStarShipListStart, removeStarshipFromFleet } from './redux/starship/starship.actions';
import StarShipCardLoader from './components/starShipCardLoader';
import { getTotalCapacity } from './config/util';

function App() {
  const dispatch = useDispatch();
  const [toggleDark, setToggleDark] = useState(false);
  const [totalCapacity, setTotalCapacity] = useState(0);
  const [usedCapacity, setUsedCapacity] = useState(0);
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

  const starshipStore = useSelector((state) => state.starship);
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

  const handleAddToFleet = (starshipToAdd) => {
    if (starshipStore.userFleet.some(fleetship => fleetship.url === starshipToAdd.url)) {
      // Todo: Show toast msg here.
    } else {
      starshipToAdd['used_capacity'] = 0;
      setTotalCapacity(totalCapacity + getTotalCapacity(starshipToAdd.crew, starshipToAdd.passengers, false));
      dispatch(addStarshipInFleet(starshipToAdd));
    }
  }

  const handleRemoveFromFleet = (starshipToRemove) => {
    setTotalCapacity(totalCapacity - getTotalCapacity(starshipToRemove.crew, starshipToRemove.passengers, false));
    dispatch(removeStarshipFromFleet(starshipToRemove));
  }

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
          {starshipStore.loading ? (
            <Grid container spacing={2}>
              {Array.from(new Array(4)).map((item, index) => (
                <StarShipCardLoader key={index} />
              ))}
            </Grid>
          ) : (
            starshipStore.error ? (
              <Typography sx={{ flexGrow: 1 }} variant="h4" color="inherit">
                {t('messages.noStartShipsFound')}
              </Typography>
            ) : (
              <StarShipCard
                starshipList={starshipStore.starshipList}
                addToFleet={handleAddToFleet}
              />
            ))
          }
        </Grid>
        <Grid item xs={12} sm={3} lg={4}>
          <Typography fontWeight={600} sx={{ flexGrow: 1, mb: 2 }} variant="h5" color="inherit">
            {t('labels.yourFleet')}
          </Typography>
          <Typography sx={{ fontWeight: 'bold' }} variant="body1">
            {t('labels.totalFleetCapacity')}: {totalCapacity}
          </Typography>
          <Typography sx={{ fontWeight: 'bold', mb: '1.5rem' }} variant="body1">
            {t('labels.usedFleetCapacity')}: {usedCapacity}
          </Typography>
          <FleetShipSection
            userFleetList={starshipStore.userFleet}
            removeFromFleet={handleRemoveFromFleet} />
        </Grid>
      </Grid>
      {/* End Main Section */}
    </ThemeProvider>
  );
}

export default App;
