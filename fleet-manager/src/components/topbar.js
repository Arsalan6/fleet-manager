import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import AppBar from '@mui/material/AppBar';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const TopBar = (props) => {
  const {
    onToggleChange,
    isDark
  } = props;
  const { t } = useTranslation();
  const handleToggle = () => {
    onToggleChange();
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <AirplanemodeActiveIcon sx={{ mr: 2 }} />
        <Typography sx={{ flexGrow: 1 }} variant="h6" color="inherit">
          {t('labels.starShipFleetManager')}
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={isDark}
                onChange={handleToggle}
              />
            }
            label={isDark ? t('labels.dark') : t('labels.light')}
          />
        </FormGroup>
      </Toolbar>
    </AppBar>
  );
}

TopBar.propTypes = {
  onToggleChange: PropTypes.func.isRequired,
  isDark: PropTypes.bool.isRequired,
};

export default TopBar;