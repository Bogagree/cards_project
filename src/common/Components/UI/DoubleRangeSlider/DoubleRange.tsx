import React from 'react'
import {Slider} from "@mui/material";

type DoubleRangePropsType = {
    onChangeRange?: (event: Event, newValue: number | number[]) => void
    value: number[]
    minValue?: number
    maxValue?: number
    disabled?: boolean
}

export const DoubleRange: React.FC<DoubleRangePropsType> = ({
                                                                           onChangeRange, value, disabled,
                                                                           minValue, maxValue,
                                                                       }) => {

    const handleChange = (event: Event, newValue: number | number[]) => {
        onChangeRange && onChangeRange(event, newValue as [number, number])
    }

    return (
        <>
            <Slider
                size="small"
                value={value}
                onChange={handleChange}
                disableSwap
                min={minValue}
                max={maxValue}
                disabled={disabled}
            />
        </>
    )
}