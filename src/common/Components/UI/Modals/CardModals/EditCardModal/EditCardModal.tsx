import React from 'react';
import {BasicModal} from '../../BasicModal/BasicModal';
import {useFormik} from 'formik';
import styles from './EditCardModal.module.css';
import {CommonInputText} from '../../../InputText/CommonInputText';
import {useAppDispatch} from '../../../../../../app/store';
import {updateCardTC} from '../../../../../../features/cards/cards-reducer';
import {CardsType} from '../../../../../../api/cards-api';


type PropsType = {
    title: string
    openModal: boolean
    closeHandler: () => void
    cardData: CardsType
}

type RegistrationErrorType = {
    question?: string
    answer?: string
}

export const EditCardModal: React.FC<PropsType> = ({title, openModal, closeHandler, cardData}) => {
    const dispatch = useAppDispatch()

    const formik = useFormik({
        initialValues: {
            question: cardData.question,
            answer: cardData.answer
        },
        validate: (values) => {

            const errors: RegistrationErrorType = {}

            if (!values.question) {
                errors.question = 'Question is required'
            } else if (values.question.length <= 1) {
                errors.question = 'Question should be more then 1 symbols'
            }

            if (!values.answer) {
                errors.answer = 'Answer is required'
            } else if (values.answer.length <= 1) {
                errors.answer = 'Answer should be more then 1 symbols'
            }
            return errors
        },
        onSubmit: values => {
        }
    });

    const { isValid } = { ...formik };

    const saveHandler = () => {
        dispatch(updateCardTC({
            _id: cardData._id,
            question: formik.values.question,
            answer: formik.values.answer
        }, cardData.cardsPack_id))
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
                        <div className={styles.error} style={{color: 'red'}}>{formik.errors.question}</div>}
                </div>
                <div className={styles.inputWrapper}>
                    <CommonInputText
                        inputName={'Answer'}
                        id={'answer'}
                        {...formik.getFieldProps('answer')}
                    />
                    {formik.touched.answer && formik.errors.answer &&
                        <div className={styles.error} style={{color: 'red'}}>{formik.errors.answer}</div>}
                </div>
                <div className={styles.buttonWrapper}>
                    <button onClick={closeHandler} className={styles.buttonCancel}>Cancel</button>
                    <button className={styles.buttonSave} onClick={saveHandler}
                            disabled={!isValid}>Save</button>
                </div>
            </form>
        </BasicModal>
    )
}


