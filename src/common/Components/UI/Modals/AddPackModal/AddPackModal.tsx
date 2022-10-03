import React from 'react';
import {BasicModal} from '../BasicModal/BasicModal';
import {useFormik} from 'formik';
import styles from './AddPackModal.module.css';
import {CommonInputText} from '../../InputText/CommonInputText';
import {CommonCheckbox} from '../../Checkbox/CommonCheckbox';
import {useAppDispatch} from '../../../../../app/store';
import {createPackCardsTC, getPacksTC} from '../../../../../features/packs/packs-reducer';


type PropsType = {
    nameButton: string
    title: string
}

type RegistrationErrorType = {
    name?: string
    private?: boolean
}

export const AddPackModal: React.FC<PropsType> = ({nameButton, title}) => {
    const dispatch = useAppDispatch()

    const formik = useFormik({
        initialValues: {
            name: '',
            private: false
        },
        validate: (values) => {

            const errors: RegistrationErrorType = {}

            if (!values.name) {
                errors.name = 'Name is required'
            } else if (values.name.length <= 2) {
                errors.name = 'Name should be more then 2 symbols'
            }
            return errors
        },
        onSubmit: values => {
            dispatch(createPackCardsTC(values))
            formik.resetForm()
            console.log(values)
        },
    });

    const saveHandler = () => {
        dispatch(createPackCardsTC(formik.values))
        formik.resetForm()
    }

    return (
        <BasicModal nameButton={nameButton} title={title} ActionButton={() => <button className={styles.buttonSave} onClick={saveHandler}>Save</button>}>
            <form className={styles.form} onSubmit={formik.handleSubmit}>
                <div className={styles.inputWrapper}>
                    <CommonInputText
                        inputName={'Name'}
                        id={'name'}
                        {...formik.getFieldProps('name')}
                    />
                    {formik.touched.name && formik.errors.name &&
                        <div style={{color: 'red'}}>{formik.errors.name}</div>}
                </div>
                <div className={styles.checkboxWrapper}>
                    <CommonCheckbox
                        checked={formik.values.private}
                        {...formik.getFieldProps('private')}
                    >
                        Private pack
                    </CommonCheckbox>
                </div>
            </form>
        </BasicModal>
    )
}


AddPackModal.propTypes = {};

