import React from 'react';
import {BasicModal} from '../../BasicModal/BasicModal';
import {useFormik} from 'formik';
import styles from './AddPackModal.module.css';
import {CommonInputText} from '../../../InputText/CommonInputText';
import {CommonCheckbox} from '../../../Checkbox/CommonCheckbox';
import {useAppDispatch} from '../../../../../../app/store';
import {createPackCardsTC} from '../../../../../../features/packs/packs-reducer';


type PropsType = {
    title: string
    openModal: boolean
    closeHandler: () => void
}

type RegistrationErrorType = {
    name?: string
    private?: boolean
}

export const AddPackModal: React.FC<PropsType> = ({title, openModal, closeHandler}) => {
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
            } else if (values.name.length <= 1) {
                errors.name = 'Name should be more then 1 symbols'
            }
            return errors
        },
        onSubmit: values => {
        }
    });

    const { isValid, dirty } = { ...formik };

    const saveHandler = () => {
        dispatch(createPackCardsTC(formik.values))
        closeHandler()
        formik.resetForm()
    }

    return (
        <BasicModal title={title} openModal={openModal} closeHandler={closeHandler}>
            <form className={styles.form} onSubmit={formik.handleSubmit}>
                <div className={styles.inputWrapper}>
                    <CommonInputText
                        inputName={'Name pack'}
                        id={'name'}
                        {...formik.getFieldProps('name')}
                    />
                    {formik.touched.name && formik.errors.name &&
                        <div className={styles.error} style={{color: 'red'}}>{formik.errors.name}</div>}
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
                    <button className={styles.buttonSave} onClick={saveHandler}
                            disabled={!isValid || !dirty}>Save</button>
                </div>
            </form>
        </BasicModal>
    )
}


