import React from 'react';
import {BasicModal} from '../../BasicModal/BasicModal';
import styles from './DeleteCardModal.module.css';
import {useAppDispatch} from '../../../../../../app/store';
import {CardsType} from '../../../../../../api/cards-api';
import {deleteCardTC} from '../../../../../../features/cards/cards-reducer';


type PropsType = {
    title: string
    openModal: boolean
    closeHandler: () => void
    cardData: CardsType
}

export const DeleteCardModal: React.FC<PropsType> = ({title, openModal, closeHandler, cardData}) => {
    const dispatch = useAppDispatch()

    const deleteHandler = () => {
        dispatch(deleteCardTC(cardData._id, cardData.cardsPack_id))
        closeHandler()
    }

    return (
        <BasicModal title={title} openModal={openModal} closeHandler={closeHandler}>
            <p className={styles.text}>
                Do you really want to remove <b>{cardData.question}</b>?
                <br/>
                All cards will be deleted.
            </p>
            <div className={styles.buttonWrapper}>
                <button onClick={closeHandler} className={styles.buttonCancel}>Cancel</button>
                <button className={styles.buttonDelete} onClick={deleteHandler}>Delete</button>
            </div>
        </BasicModal>
    )
}


