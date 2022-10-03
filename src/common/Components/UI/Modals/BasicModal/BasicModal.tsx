import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {ReactNode, useState} from 'react';
import {CommonButton} from '../../Buttons/Button/CommonButton';
import s from './BasicModal.module.css'
import cross from '../../../../../assets/icons/cross.svg';
import styles from '../AddPackModal/AddPackModal.module.css';

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
    nameButton: string
    title: string
    children: ReactNode
    ActionButton: () => JSX.Element
}

export const BasicModal: React.FC<PropsType> = ({ActionButton, nameButton, title,  children}) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <CommonButton onClick={handleOpen}>
                {nameButton}
            </CommonButton>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={style}>
                    <div className={s.titleBox}>
                        <h3>{title}</h3>
                        <img src={cross} onClick={handleClose} alt="cross" />
                    </div>
                    {children}
                    <div className={styles.buttonWrapper}>
                        <button onClick={handleClose} className={styles.buttonCancel}>Cancel</button>
                        {ActionButton()}
                    </div>
                </Box>
            </Modal>
        </div>
    );
}
