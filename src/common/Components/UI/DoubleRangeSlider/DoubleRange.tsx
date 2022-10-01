import React from 'react'
import {Slider} from "@mui/material";

type SuperDoubleRangePropsType = {
    onChangeRange?: (value: [number, number]) => void
    value?: [number, number]
    minValue?: number
    maxValue?: number
    disabled?: boolean
}

export const DoubleRange: React.FC<SuperDoubleRangePropsType> = ({
                                                                   onChangeRange, value, disabled,
                                                                   minValue, maxValue,
                                                               }) => {

    const handleChange = (event: Event, newValue: number | number[]) => {
        onChangeRange && onChangeRange(newValue as [number, number])
    }

    return (
        <>
            <Slider
                size="small"
                value={value}
                onChange={handleChange}
                disableSwap
                min={minValue ? minValue : 0}
                max={maxValue ? maxValue : 100}
                disabled={disabled}
            />
        </>
    )
}