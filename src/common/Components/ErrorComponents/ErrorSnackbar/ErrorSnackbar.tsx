import React from 'react';
import {useDispatch} from 'react-redux';
import {Alert, Snackbar} from "@mui/material";
import {useAppSelector} from "../../../../app/store";
import {setAppError} from "../../../../app/app-reducer";


export const ErrorSnackbar: React.FC = () => {

    const error = useAppSelector(state => state.app.error)
    const dispatch = useDispatch();

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setAppError(null))
    };

    return (
        <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                {error}
            </Alert>
        </Snackbar>
    );
}
