import React from 'react';
import CustomDialog from './CustomDialog';
import { hintMessages } from '../data/hintMessages';
import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

export const HintDialog = ({hintIndex, open, handleClose}) => {
  console.log('hint dialog',hintIndex)
    return (
        <CustomDialog open={open} handleClose={handleClose}>
            <DialogTitle id='alert-dialog-title'>Enjoy your hint!</DialogTitle>
            <DialogContent sx={{ paddingBottom: '0rem' }}>
                <DialogContentText id='alert-dialog-description'>
                    {hintMessages[`${hintIndex[0]},${hintIndex[1]}`]}
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose}>OK</Button>
            </DialogActions>
        </CustomDialog>
    );
};
