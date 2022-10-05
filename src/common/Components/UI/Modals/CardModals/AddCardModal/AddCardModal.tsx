import React from 'react';
import {BasicModal} from '../../BasicModal/BasicModal';
import {useFormik} from 'formik';
import styles from './AddCardModal.module.css';
import {CommonInputText} from '../../../InputText/CommonInputText';
import {useAppDispatch} from '../../../../../../app/store';
import {createCardTC} from '../../../../../../features/cards/cards-reducer';


type PropsType = {
    title: string
    openModal: boolean
    closeHandler: () => void
    packId?: string
}

type RegistrationErrorType = {
    question?: string
    answer?: string
}

export const AddCardModal: React.FC<PropsType> = ({title, openModal, closeHandler, packId}) => {
    const dispatch = useAppDispatch()

    const formik = useFormik({
        initialValues: {
            question: '',
            answer: ''
        },
        validate: (values) => {

            const errors: RegistrationErrorType = {}

            if (!values.question) {
                errors.question = 'Question is required'
            } else if (values.question.length <= 2) {
                errors.question = 'Question should be more then 2 symbols'
            }

            if (!values.answer) {
                errors.answer = 'Answer is required'
            } else if (values.answer.length <= 2) {
                errors.answer = 'Answer should be more then 2 symbols'
            }
            return errors
        },
        onSubmit: values => {
        }
    });

    const saveHandler = () => {
        packId && dispatch(createCardTC({
            cardsPack_id: packId, question: formik.values.question, answer: formik.values.answer
        }))
        closeHandler()
        formik.resetForm()
    }

    return (
        <BasicModal title={title} openModal={openModal} closeHandler={closeHandler}>
            <form className={styles.form} onSubmit={formik.handleSubmit}>
                <div className={styles.inputWrapper}>
                    <CommonInputText
                        inputName={'Question'}
                        id={'question'}
                        {...formik.getFieldProps('question')}
                    />
                    {formik.touched.question && formik.errors.question &&
                        <div style={{color: 'red'}}>{formik.errors.question}</div>}
                </div>
                <div className={styles.inputWrapper}>
                    <CommonInputText
                        inputName={'Answer'}
                        id={'answer'}
                        {...formik.getFieldProps('answer')}
                    />
                    {formik.touched.answer && formik.errors.answer &&
                        <div style={{color: 'red'}}>{formik.errors.answer}</div>}
                </div>
                <div className={styles.buttonWrapper}>
                    <button onClick={closeHandler} className={styles.buttonCancel}>Cancel</button>
                    <button className={styles.buttonSave} onClick={saveHandler}>Save</button>
                </div>
            </form>
        </BasicModal>
    )
}

AddCardModal.propTypes = {};

