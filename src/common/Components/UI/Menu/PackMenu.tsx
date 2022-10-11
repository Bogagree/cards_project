import React, {useState} from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import iconMenu from '../../../../assets/icons/iconMenu.png'
import {Path} from "../../../Enum/path";
import {setCardsParams, setPackIdAC} from "../../../../features/cards/cards-reducer";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../../../app/store";
import {EditPackModal} from '../Modals/PackModals/EditPackModal/EditPackModal';
import {DeletePackModal} from '../Modals/PackModals/DeletePackModal/DeletePackModal';
import {PackType} from '../../../../api/cards-api';

type PropsType = {
    packId: string
    isMyPack: boolean
    packData?: PackType
}

export const PackMenu: React.FC<PropsType> = ({packId, isMyPack, packData}) => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);

    const [openModal, setOpenModal] = useState(false);
    const openHandler = () => setOpenModal(true);
    const closeHandler = () => setOpenModal(false);

    const [typeModal, setTypeModal] = useState('')
    const openEditHandler = () => {
        setTypeModal('edit')
        openHandler()
    }
    const openDeleteHandler = () => {
        setTypeModal('delete')
        openHandler()
    }

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLearn = () => {
        handleClose()
        navigate(`${Path.LEARN}/${packId}`)
        dispatch(setCardsParams({cardsPack_id: packId}))
        dispatch(setPackIdAC(packId))
    }
    const handleDelete = () => {
        handleClose()
        openDeleteHandler()
    }
    const handleEdit = () => {
        handleClose()
        openEditHandler()
    }

    return (
        <div>
            <Button
                id="demo-positioned-button"
                aria-controls={open ? 'demo-positioned-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <img src={iconMenu} alt={'icon'}/>
            </Button>
            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                {isMyPack
                    ? <>
                        <MenuItem onClick={handleEdit}>Edit</MenuItem>
                        <MenuItem onClick={handleDelete}>Delete</MenuItem>
                        <MenuItem onClick={handleLearn}>Learn</MenuItem>
                    </>
                    : <MenuItem onClick={handleLearn}>Learn</MenuItem>

                }

            </Menu>
            {typeModal === 'edit' &&
                <EditPackModal title={'Edit pack'} openModal={openModal} closeHandler={closeHandler}
                               packData={packData}/>
            }
            {typeModal === 'delete' &&
                <DeletePackModal title={'Delete pack'} openModal={openModal} closeHandler={closeHandler}
                                 packData={packData}/>
            }
        </div>
    );
};