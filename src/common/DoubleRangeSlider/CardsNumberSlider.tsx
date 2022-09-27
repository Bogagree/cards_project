import React, {ChangeEvent, useState} from 'react'
import {DoubleRange} from "./DoubleRange";
import style from './CardsNumber.module.css'


export function CardsNumberSlider() {

    const [minValue, setMinValue] = useState(0)
    const maxValue = 100

    const [value1, setValue1] = useState(minValue)
    const [value2, setValue2] = useState(maxValue)


    const onChangeRange = ([value1, value2]: [number, number]) => {
        setValue1(value1)
        setValue2(value2)
    }

    function handlerMinValue(e: ChangeEvent<HTMLInputElement>) {
        let mV = +e.currentTarget.value
        if (mV > 100) {
            mV = 100
        }
        setMinValue(mV)
        setValue1(mV)
    }

    return (
        <div>
            <div className={style.container}>

                <span className={style.toolTitle}>Number of cards</span>

                <div className={style.rangeContainer}>

                    <span className={style.cardsNumber}>{value1}</span>

                    <div className={style.doubleRange}>
                        <DoubleRange
                            onChangeRange={onChangeRange}
                            value={[value1, value2]}
                        />
                    </div>

                    <span className={style.cardsNumber}>{value2}</span></div>

            </div>

        </div>
    )
}