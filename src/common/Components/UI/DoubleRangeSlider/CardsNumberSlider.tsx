import React, {useEffect, useState} from 'react'
import {DoubleRange} from "./DoubleRange";
import style from './CardsNumber.module.css'
import {useAppDispatch, useAppSelector} from '../../../../app/store';
import {getPackQueryParams} from '../../../../features/packs/packs-selector';
import {setPacksParams} from '../../../../features/packs/packs-reducer';
import {useDebounce} from '../../../Hooks/useDebounce';

type CardsNumberSlider = {
    minCardsCount: number
    maxCardsCount: number
}

export const CardsNumberSlider: React.FC<CardsNumberSlider> = React.memo(({minCardsCount,maxCardsCount}) => {
    const dispatch = useAppDispatch();

    const queryParams = useAppSelector(getPackQueryParams);

    const [range, setRange] = useState<number[]>([minCardsCount, maxCardsCount]);

    const debouncedRange = useDebounce<number[]>(range, 500);

    const onChangeRange = (event: Event, range: number | number[]) => {
        const value = range as number[];
        setRange(value);
    };


    useEffect(() => {
        dispatch(setPacksParams({
            ...queryParams,
            min: range[0],
            max: range[1]
        }))

    }, [debouncedRange])

    return (
        <div>
            <div className={style.container}>

                <span className={style.toolTitle}>Number of cards</span>

                <div className={style.rangeContainer}>

                    <span className={style.cardsNumber}>{range[0]}</span>

                    <div className={style.doubleRange}>
                        <DoubleRange
                            onChangeRange={onChangeRange}
                            value={range}
                            disabled={false}
                            minValue={minCardsCount}
                            maxValue={maxCardsCount}
                        />
                    </div>

                    <span className={style.cardsNumber}>{maxCardsCount}</span></div>

            </div>

        </div>
    )
})