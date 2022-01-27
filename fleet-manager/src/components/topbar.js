import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import AppBar from '@mui/material/AppBar';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import PropTypes from 'prop-types';

const TopBar = (props) => {
  const {
    onToggleChange,
    isDark
  } = props;

  const handleToggle  = () => {
    onToggleChange();
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <AirplanemodeActiveIcon sx={{ mr: 2 }} />
        <Typography sx={{ flexGrow: 1 }} variant="h6" color="inherit">
          Star Feet Manager
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={isDark}
                onChange={handleToggle}
                aria-label="login switch"
              />
            }
            label={isDark ? 'Dark' : 'Light'}
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