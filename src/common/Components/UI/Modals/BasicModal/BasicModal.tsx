import * as React from 'react';
import {ReactNode} from 'react';
import Modal from '@mui/material/Modal';
import s from './BasicModal.module.css'
import cross from '../../../../../assets/icons/cross.svg';

// const style = {
//     position: 'absolute' as 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 395,
//     height: 'auto',
//     bgcolor: 'background.paper',
//     boxShadow: 24,
//
// };

type PropsType = {
    title: string
    openModal: boolean
    children: ReactNode
    closeHandler: () => void
}

export const BasicModal: React.FC<PropsType> = (
    {openModal, title, closeHandler,
        children}) => {

    return (
        <div>
            <Modal open={openModal} onClose={closeHandler} sx={{ zIndex: 1 }}>
                <div className={s.main}>
                    <div className={s.titleBox}>
                        <h3>{title}</h3>
                        <img src={cross} onClick={closeHandler} alt="cross" />
                    </div>
                    {children}
                </div>
            </Modal>
        </div>
    );
}
