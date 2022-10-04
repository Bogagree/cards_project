import React from 'react';
import {useFormik} from 'formik';
import styles from './EditPackModal.module.css';
import {CommonInputText} from '../../InputText/CommonInputText';
import {CommonCheckbox} from '../../Checkbox/CommonCheckbox';
import {useAppDispatch, useAppSelector} from '../../../../../app/store';
import {updatePackCardsTC} from '../../../../../features/packs/packs-reducer';
import {PackType} from '../../../../../api/cards-api';
import {BasicModal} from '../BasicModal/BasicModal';


type PropsType = {
    title: string
    openModal: boolean
    closeHandler: () => void
    packData: PackType
}

type RegistrationErrorType = {
    name?: string
    private?: boolean
}

export const EditPackModal: React.FC<PropsType> = ({title, openModal, closeHandler, packData}) => {
    const dispatch = useAppDispatch()
    const userId = useAppSelector(state => state.auth.user._id)

    const formik = useFormik({
        initialValues: {
            name: packData.name,
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
        }
    });

    const editHandler = () => {
        dispatch(updatePackCardsTC({_id: packData._id, name: formik.values.name,
                        private: formik.values.private}))
        closeHandler()
        formik.resetForm()
    }

    return (
        <BasicModal title={title} openModal={openModal} closeHandler={closeHandler} packData={packData}>
            <form className={styles.form} onSubmit={formik.handleSubmit}>
                <div className={styles.inputWrapper}>
                    <CommonInputText
                        inputName={'Name pack'}
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
                <div className={styles.buttonWrapper}>
                    <button onClick={closeHandler} className={styles.buttonCancel}>Cancel</button>
                    <button className={styles.buttonSave} onClick={editHandler}>Save</button>
                </div>
            </form>
        </BasicModal>
    )
}


EditPackModal.propTypes = {};

