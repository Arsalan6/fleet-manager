import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import { orange, green, red } from '@mui/material/colors';

const LinerProgressBar = styled(LinearProgress)(({ theme, value }) => ({
  height: 20,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: value > 80 ? red[700] : value > 50 ? orange[700] : green[700],
  },
}));

export default LinerProgressBar;