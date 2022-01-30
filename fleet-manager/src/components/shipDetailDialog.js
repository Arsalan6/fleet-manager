import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import { getFormattedDate, getFormattedNumber, getTotalCapacity } from '../config/util';
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { useTranslation } from 'react-i18next';

const ShipDetailDialog = (props) => {
  const {
    onClose,
    onSave,
    open,
    selectedShip,
    isFleetShip,
  } = props;
  const [passengerOnboard, setPassengerOnboard] = useState(0);
  const { t } = useTranslation();
  const invalidChars = ["-", "+", "e", "."];
  // only allow white space or positive integers.
  const regex = /^(\s*|\d+)$/;

  useEffect(() => {
    setPassengerOnboard(+selectedShip?.used_capacity || 0);
  }, [selectedShip?.used_capacity]);

  const handleClose = () => {
    onClose(true);
  };

  const handleSave = () => {
    selectedShip['used_capacity'] = passengerOnboard;
    onSave();
  }

  const validatePassengerCount = (event) => {
    event.preventDefault();
    const { value } = event.target;
    if (!invalidChars.includes(value.toString().trim()) && regex.test(value.toString().trim())) {
      setPassengerOnboard(value.trim() > +selectedShip?.max_capacity ? +selectedShip?.max_capacity : value.trim());
    }
  }

  return (
    <Dialog fullWidth maxWidth="md" open={open} onClose={handleClose}>
      <DialogTitle>
        StarShip Details
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 12,
            top: 12,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item xs={4}>
            <Typography variant="body1">{t('labels.name')}:</Typography>
            <Typography variant="body1">{t('labels.model')}:</Typography>
            <Typography variant="body1">{t('labels.crew')}:</Typography>
            <Typography variant="body1">{t('labels.passengersCount')}:</Typography>
            <Typography variant="body1">{t('labels.maxPassengersCount')}:</Typography>
            <Typography variant="body1">{t('labels.maxAtmSpeed')}:</Typography>
            <Typography variant="body1">{t('labels.manufacture')}:</Typography>
            <Typography variant="body1">{t('labels.costInCredits')}:</Typography>
            <Typography variant="body1">{t('labels.cargoCapacityInKg')}:</Typography>
            <Typography variant="body1">{t('labels.hyperDriveRating')}:</Typography>
            <Typography variant="body1">{t('labels.mglt')}:</Typography>
            <Typography variant="body1">{t('labels.consumables')}:</Typography>
            <Typography variant="body1">{t('labels.length')}:</Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>{t('labels.createdOn')}:</Typography>
          </Grid>
          <Grid sx={{ textOverflow: 'ellipsis' }} item xs={8}>
            <Typography sx={{ fontWeight: 'bold' }} variant="body1">{selectedShip?.name} </Typography>
            <Typography sx={{ fontWeight: 'bold' }} variant="body1">{selectedShip?.model} </Typography>
            <Typography sx={{ fontWeight: 'bold' }} variant="body1">{selectedShip?.crew} </Typography>
            <Typography sx={{ fontWeight: 'bold' }} variant="body1">{selectedShip?.passengers} </Typography>
            <Typography
              sx={{ fontWeight: 'bold' }}
              variant="body1">
              {isFleetShip ? getFormattedNumber(selectedShip?.max_capacity) : getTotalCapacity(selectedShip?.crew || "0", selectedShip?.passengers || "0")}
              </Typography>
            <Typography variant="body1">{selectedShip?.max_atmosphering_speed} </Typography>
            <Typography variant="body1">{selectedShip?.manufacturer} </Typography>
            <Typography variant="body1">{getFormattedNumber(selectedShip?.cost_in_credits)} credits </Typography>
            <Typography variant="body1">{getFormattedNumber(selectedShip?.cargo_capacity)}kg </Typography>
            <Typography variant="body1">{selectedShip?.hyperdrive_rating} </Typography>
            <Typography variant="body1">{selectedShip?.MGLT} </Typography>
            <Typography variant="body1">{selectedShip?.consumables} </Typography>
            <Typography variant="body1">{selectedShip?.length.includes(',') ? selectedShip?.length : getFormattedNumber(selectedShip?.length)} meters </Typography>
            <Typography sx={{ fontWeight: 'bold', mb: 1 }} variant="body1">{getFormattedDate(selectedShip?.created)}</Typography>
          </Grid>
        </Grid>
        {isFleetShip &&
          <>
          <Typography variant="body1">{t('labels.passengersOnboard')}</Typography>
            <TextField
              sx={{ width: '60%' }}
              size="small"
              onChange={validatePassengerCount.bind(this)}
              variant="outlined"
              value={passengerOnboard} />
          </>}
      </DialogContent>
      <DialogActions sx={{ justifyContent: isFleetShip ? "space-between" : "center", px: '24px' }}>
        <Button variant="contained" color="error" onClick={handleClose}>{t('labels.close')}</Button>
        {isFleetShip && <Button variant="contained" onClick={handleSave}>{t('labels.save')}</Button>}
      </DialogActions>
    </Dialog>
  );
}

ShipDetailDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedShip: PropTypes.object,
  isFleetShip: PropTypes.bool.isRequired,
};

export default ShipDetailDialog;