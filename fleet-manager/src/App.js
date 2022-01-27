import { useState } from 'react';

import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import TopBar from './components/topbar';

function App() {
  const [toggleDark, settoggleDark] = useState(false);
  const handleToggleChange = () => {
    settoggleDark(!toggleDark);
  }
  const theme = createTheme({
    palette: {
      mode: toggleDark ? 'dark' : 'light',
    }
  });

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
        <Grid item xs={8}>
          <Typography fontWeight={600} sx={{ flexGrow: 1 }} variant="h5" color="inherit">
            Search Starships
          </Typography>
          <TextField sx={{ marginTop: '1rem', width: '26rem', marginBottom: '1rem' }} id="outlined-basic" placeholder="Enter Startship name" variant="outlined" />
        </Grid>
        <Grid item xs={4}>
          <Typography fontWeight={600} sx={{ flexGrow: 1 }} variant="h5" color="inherit">
            Your Fleet
          </Typography>
        </Grid>
      </Grid>
      {/* End Main Section */}
    </ThemeProvider>
  );
}

export default App;
