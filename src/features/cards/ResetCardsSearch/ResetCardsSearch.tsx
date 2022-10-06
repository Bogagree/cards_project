import React from 'react';
import {useAppDispatch, useAppSelector} from '../../../app/store';
import {setCardsParams} from '../cards-reducer';

export const ResetCardsSearch = () => {

    const dispatch = useAppDispatch()
    const params = useAppSelector(state => state.cards.queryParams)

    const resetSearch = () => {
        dispatch(setCardsParams({...params, cardQuestion:''}))
    };

    return (
        <>
            {'if nothing found, press this button =>'}
            <button onClick={resetSearch}>reset search</button>
            {'¯\\_(ツ)_/¯'}
        </>
    );
};