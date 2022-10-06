import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {ReactNode} from 'react';
import s from './BasicModal.module.css'
import cross from '../../../../../assets/icons/cross.svg';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24
};

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
            <Modal
                open={openModal}
                onClose={closeHandler}
            >
                <Box sx={style}>
                    <div className={s.titleBox}>
                        <h3>{title}</h3>
                        <img src={cross} onClick={closeHandler} alt="cross" />
                    </div>
                    {children}
                </Box>
            </Modal>
        </div>
    );
}
