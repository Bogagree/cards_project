import React, {useState} from 'react';
import style from './PacksFilter.module.css'
import {useAppDispatch, useAppSelector} from "../../../../app/store";
import {setPacksParams} from "../../../../features/packs/packs-reducer";

export type FilterType = 'all' | 'my'

type PropsType = {
    userId: string
}

export const PacksFilter: React.FC<PropsType> = React.memo(({userId}) => {

    const dispatch = useAppDispatch()
    const queryParams = useAppSelector(state => state.packs.queryParams)

    const [filter, setFilter] = useState<FilterType>(queryParams.user_id ? 'my' : 'all')


    const myFilterHandler = () => {
        setFilter('my')
        dispatch(setPacksParams({...queryParams, user_id: userId}))
    };

    const allFilterHandler = () => {
        setFilter('all')
        dispatch(setPacksParams({...queryParams, user_id: ''}))
    };

    const allFilterCell = filter === 'all' ? `${style.filterCell} ${style.active}` : style.filterCell
    const myFilterCell = filter === 'my' ? `${style.filterCell} ${style.active}` : style.filterCell

    return (
        <div className={style.container}>

            <span className={style.toolTitle}>Number of cards</span>
            <div className={style.buttons}>
                <div onClick={myFilterHandler} className={myFilterCell}>My</div>
                <div onClick={allFilterHandler} className={allFilterCell}>All</div>
            </div>

        </div>
    );
});