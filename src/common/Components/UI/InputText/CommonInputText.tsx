import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent} from 'react'
import style from "./CommonInputText.module.css";


type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>


type CommonInputTextPropsType = DefaultInputPropsType & { 
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: string
    spanClassName?: string
    inputName: string
}

export const CommonInputText: React.FC<CommonInputTextPropsType> = (
    {
        type, 
        onChange, onChangeText,
        onKeyPress, onEnter,
        error, inputName,
        className, spanClassName,

        ...restProps
    }
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement> ) => {
        onChange 
        && onChange(e) 

        onChangeText && onChangeText(e.currentTarget.value)
    }
    const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
        onKeyPress && onKeyPress(e);

        onEnter 
        && e.key === 'Enter' 
        && onEnter() 
    }

    const finalSpanClassName = `${style.error} ${spanClassName ? spanClassName : ''}`
    const finalInputClassName = `${style.input__field} ${error ? style.errorInput : ''} ${className}` 

    return (
        <>
            <label className={style.input}>
                <input
                    type={type}
                    placeholder={" "}
                    onChange={onChangeCallback}
                    onKeyPress={onKeyPressCallback}
                    className={finalInputClassName}

                    {...restProps}
                />
                <span className={style.input__label}>{inputName}</span>

                {error && <span className={`${style.form__label} ${finalSpanClassName}`}>{error}</span>}
            </label>
        </>
    )
}