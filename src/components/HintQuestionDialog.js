import React, { useState } from 'react';
import CustomDialog from './CustomDialog';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { questions } from '../data/questions';
import { Box } from '@mui/material';

export const HintQuestionDialog = ({ open, handleClose, questionNo }) => {
    const [state, setstate] = useState({
        selectedOption: null,
        isCorrect: null,
        timeOutId: null,
    });
    const onOptionSelect = (optionIndex) => {
        if (state.selectedOption !== null) return;
        if (optionIndex === questions[questionNo].answer) {
            const id = setTimeout(() => {
                handleClose(true);
            }, 2000);
            setstate({
                selectedOption: optionIndex,
                isCorrect: true,
                timeOutId: id,
            });
        } else {
            const id = setTimeout(() => {
                handleClose(false);
            }, 2000);
            setstate({
                selectedOption: optionIndex,
                isCorrect: false,
                timeOutId: id,
            });
        }
    };
    const Option = ({ option, index, onOptionSelect }) => {
        return (
            <Box
                style={{
                    cursor: 'pointer',
                    marginBottom: '0.5rem',
                    border:
                        state.selectedOption === index
                            ? state.isCorrect
                                ? '2px solid green'
                                : '2px solid red'
                            : '1px solid gray',
                    borderRadius: '10px',
                    padding: '10px',
                }}
                onClick={onOptionSelect}
            >
                {option}
            </Box>
        );
    };
    return (
        <CustomDialog open={open} handleClose={handleClose}>
            <DialogTitle id='alert-dialog-title'>
                Answer this question
            </DialogTitle>
            <DialogContent sx={{ paddingBottom: '0rem' }}>
                <DialogContentText id='alert-dialog-description'>
                    {questions[questionNo].question}{' '}
                </DialogContentText>
            </DialogContent>
            <DialogContent sx={{ paddingBottom: '0' }}>
                {questions[questionNo].options.map((option, index) => (
                    <Option
                    key={index}
                        option={option}
                        index={index}
                        onOptionSelect={() => {
                            onOptionSelect(index);
                        }}
                    />
                ))}
            </DialogContent>
            <DialogContent
                sx={{ paddingTop: '0', fontSize: '0.8rem', color: 'gray' }}
            >
                * Select correct answer{' '}
            </DialogContent>
        </CustomDialog>
    );
};
