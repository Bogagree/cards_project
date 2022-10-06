import React from 'react';
import style from './DisableFilter.module.css'
import disableFilters from '../../../../assets/img/DisableFilters.jpg'
import {useAppDispatch, useAppSelector} from '../../../../app/store';
import {setPacksParams} from '../../../../features/packs/packs-reducer';

export const DisableFilter = () => {

    const dispatch = useAppDispatch()

    const max = useAppSelector(state => state.packs.maxCardsCount)
    const min = useAppSelector(state => state.packs.minCardsCount)
    const pageCount = useAppSelector(state => state.packs.pageCount)
    const page = useAppSelector(state => state.packs.page)
    const user_id = useAppSelector(state => state.auth.user._id)


    const onClickHandler = () => {
        // console.log('disable filters')
        // dispatch(setPacksParams({
        //     max, min, page, pageCount, packName: '', user_id
        // }))
        window.location.reload();
    };

    return (
        <div className={style.container} onClick={onClickHandler}>
            <img src={disableFilters} alt=" disableFilters " className={style.icon}/>
        </div>
    );
};