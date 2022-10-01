import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react'
import style from './CommonButton.module.css'


type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type CommonButtonPropsType = DefaultButtonPropsType & {
    red?: boolean
}

export const CommonButton: React.FC<CommonButtonPropsType> = (
    {
        red, className,
        ...restProps
    }
) => {


    const finalClassName = `${red ? style.blue : style.default} ${className}`

    return (
        <button
            className={finalClassName}
            {...restProps}
        />
    )
}