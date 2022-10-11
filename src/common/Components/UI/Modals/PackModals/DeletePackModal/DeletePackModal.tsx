import React from 'react';
import {BasicModal} from '../../BasicModal/BasicModal';
import styles from './DeletePackModal.module.css';
import {useAppDispatch} from '../../../../../../app/store';
import {deletePackCardsTC} from '../../../../../../features/packs/packs-reducer';
import {PackType} from '../../../../../../api/cards-api';


type PropsType = {
    title: string
    openModal: boolean
    closeHandler: () => void
    packData?: PackType
}

export const DeletePackModal: React.FC<PropsType> = (
    {title, openModal, closeHandler, packData}) => {
    const dispatch = useAppDispatch()

    const deleteHandler = () => {
        dispatch(deletePackCardsTC(packData ? packData._id : ''))
        closeHandler()
    }

    return (
        <BasicModal title={title} openModal={openModal} closeHandler={closeHandler}>
            <p className={styles.text}>
                Do you really want to remove <b>{packData ? packData.name : ''}</b>?
                <br/>
                All packs will be deleted.
            </p>
            <div className={styles.buttonWrapper}>
                <button onClick={closeHandler} className={styles.buttonCancel}>Cancel</button>
                <button className={styles.buttonDelete} onClick={deleteHandler}>Delete</button>
            </div>
        </BasicModal>
    )
}



