import { useState, useEffect, useCallback } from 'react';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import TopBar from './components/topbar';
import StarShipSection from './components/starShipSection';
import { teal } from '@mui/material/colors';
import FleetShipSection from './components/fleetShipSection';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { addStarshipInFleet, fetchStarShipListStart, removeStarshipFromFleet } from './redux/starship/starship.actions';
import StarShipCardLoader from './components/starShipCardLoader';
import { getTotalCapacity } from './config/util';
import { ToastContainer } from 'react-toastify';
import constants from './config/constants';
import miscellaneousService from './services/miscellaneous_service';
import LinerProgressBar from './components/linerProgressBar';
import Tooltip from '@mui/material/Tooltip';
import ShipDetailDialog from './components/shipDetailDialog';
import { cloneDeep, debounce } from 'lodash';

function App() {
  const dispatch = useDispatch();
  const [toggleDark, setToggleDark] = useState(false);
  const [totalCapacity, setTotalCapacity] = useState(0);
  const [usedCapacity, setUsedCapacity] = useState(0);
  const [openShipDetailDialog, setOpenShipDetailDialog] = useState(false);
  const [selectedShip, setSelectedShip] = useState(null);
  const [isFleetShip, setIsFleetShip] = useState(false);
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
            cursor: 'pointer',
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
        searchParam: null,
      })
    );
  }, [dispatch]);

  const searchStarShips = () => {
    dispatch(
      fetchStarShipListStart({
        searchParam: searchQuery,
      })
    );
  }

  const delayedSearchStarship = useCallback(debounce(searchStarShips, 600), []);

  const handleSearchBarChange = (event) => {
    setSearchQuery(event.target.value);
    delayedSearchStarship();
  }

  const handleAddToFleet = (starshipToAddParam, event) => {
    event.stopPropagation();
    const starshipToAdd = cloneDeep(starshipToAddParam)
    if (starshipStore.userFleet.some(fleetship => fleetship.url === starshipToAdd.url)) {
      miscellaneousService.showToast(constants.ui.toast.warn, t('messages.starshipAlreadyExist'));
    } else {
      starshipToAdd['used_capacity'] = 0;
      starshipToAdd['max_capacity'] = getTotalCapacity(starshipToAdd.crew, starshipToAdd.passengers, false);
      setTotalCapacity(totalCapacity + getTotalCapacity(starshipToAdd.crew, starshipToAdd.passengers, false));
      dispatch(addStarshipInFleet(starshipToAdd));
    }
  }

  const handleRemoveFromFleet = (starshipToRemove) => {
    dispatch(removeStarshipFromFleet(starshipToRemove));
    setTotalCapacity(totalCapacity - getTotalCapacity(starshipToRemove.crew, starshipToRemove.passengers, false));
    miscellaneousService.showToast(constants.ui.toast.info, t('messages.starshipRemovedFromFleet'));
    setUsedCapacity(usedCapacity - +starshipToRemove['used_capacity']);
  }

  const getUsedCapacityPercentage = () => {
    return totalCapacity === 0 ? 0 : Math.round((usedCapacity / totalCapacity) * 100);
  }

  const handleOnCardClick = (selectedShipParam) => {
    setIsFleetShip(selectedShipParam.hasOwnProperty('used_capacity') ? true : false);
    setSelectedShip(selectedShipParam);
    setOpenShipDetailDialog(true);
  }

  const handleShipDetailDialogClose = () => {
    setOpenShipDetailDialog(false);
  }

  const handleShipDetailDialogSave = () => {
    setOpenShipDetailDialog(false);
    if (isFleetShip) {
      setUsedCapacity(starshipStore.userFleet.map(ship => +ship.used_capacity).reduce((prev, next) => prev + next));
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastContainer />
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
              <StarShipSection
                starshipList={starshipStore.starshipList}
                addToFleet={handleAddToFleet}
                onCardClick={handleOnCardClick} />
            ))
          }
        </Grid>
        <Grid item xs={12} sm={3} lg={4}>
          <Typography fontWeight={600} sx={{ flexGrow: 1 }} variant="h5" color="inherit">
            {t('labels.yourFleet')}
          </Typography>
          <Typography sx={{ fontWeight: 'bold' }} variant="body1">
            {t('labels.totalFleetCapacity')}: {new Intl.NumberFormat('en-US').format(totalCapacity)}
          </Typography>
          <Typography sx={{ fontWeight: 'bold', mb: .5 }} variant="body1">
            {t('labels.usedFleetCapacity')}: {new Intl.NumberFormat('en-US').format(usedCapacity)}
          </Typography>
          <Tooltip title={getUsedCapacityPercentage() + '%'}>
            <LinerProgressBar
              sx={{ mb: 2, width: '22.5rem' }}
              variant="determinate"
              value={getUsedCapacityPercentage()} />
          </Tooltip>
          <FleetShipSection
            userFleetList={starshipStore.userFleet}
            removeFromFleet={handleRemoveFromFleet}
            onCardClick={handleOnCardClick} />
        </Grid>
      </Grid>
      {/* End Main Section */}
      <ShipDetailDialog
        open={openShipDetailDialog}
        selectedShip={selectedShip}
        onSave={handleShipDetailDialogSave}
        onClose={handleShipDetailDialogClose}
        isFleetShip={isFleetShip} />
    </ThemeProvider>
  );
}

export default App;
