import React, { ChangeEvent, useState } from 'react';
import style from './Profile.module.css';
import pencil from '../../../assets/icons/pencil.svg';
import {CommonButton} from "../../../common/Button/CommonButton";

type EditableSpanPropsType = {
    value: string
    onChange: (name: string) => void
}

export const EditableSpan = React.memo(function (props: EditableSpanPropsType) {

    let [editMode, setEditMode] = useState(false);
    let [name, setName] = useState(props.value);

    const activateEditMode = () => {
        setEditMode(true);
        setName(props.value);
    }
    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(name);
    }
    const changeName = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)
    }

    return editMode
        ? <label className={style.inputBox}>
            <input value={name} onChange={changeName} autoFocus onBlur={activateViewMode}/>
            <CommonButton onClick={activateViewMode} children={'SAVE'}/>
        </label>
        : <div className={style.profileNameBox} onDoubleClick={activateEditMode}>
            <span className={style.profileName}>{props.value}</span>
            <img className={style.profilePencil} src={pencil} alt="pencil" />
        </div>

});
