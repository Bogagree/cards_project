import React, {useState} from 'react';
import styles from '../PacksList.module.css'
import {TableCell, TableRow} from "@mui/material";
import iconEdit from '../../../../assets/icons/pencil.svg'
import iconDelete from '../../../../assets/icons/iconDelete.png'
import iconLearn from '../../../../assets/icons/iconLearn.png'
import {useNavigate} from "react-router-dom";
import {Path} from "../../../../common/Enum/path";
import {useAppDispatch, useAppSelector} from "../../../../app/store";
import {PackType} from "../../../../api/cards-api";
import {setCardsParams, setPackIdAC, setPackUserIdAC} from "../../../cards/cards-reducer";
import {EditPackModal} from '../../../../common/Components/UI/Modals/PackModals/EditPackModal/EditPackModal';
import {DeletePackModal} from '../../../../common/Components/UI/Modals/PackModals/DeletePackModal/DeletePackModal';

type PropsType = {
    packData: PackType
}

export const PackItem: React.FC<PropsType> = React.memo(({packData}) => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const userId = useAppSelector(state => state.auth.user._id)

    const getDate = (date: string) => {
        const day = new Date(date).getDate() < 10 ? `0${new Date(date).getDate()}` : new Date(date).getDate()
        const month = new Date(date).getMonth() + 1 < 10 ? `0${new Date(date).getMonth() + 1}` : new Date(date).getMonth() + 1
        const year = new Date(date).getFullYear()
        return `${day}.${month}.${year}`
    }

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

    const handleGoToPack = () => {
        dispatch(setPackIdAC(packData._id))
        dispatch(setCardsParams({cardsPack_id: packData._id}))
        dispatch(setPackUserIdAC(packData.user_id))
        navigate(`${Path.CARDS}/${packData._id}`)
    }
    const handleLearn = () => {
        navigate(`${Path.LEARN}/${packData._id}`)
        dispatch(setCardsParams({cardsPack_id: packData._id}))
        dispatch(setPackIdAC(packData._id))
    }

    return (
        <TableRow key={packData._id} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
            <TableCell align="center">COVER</TableCell>
            <TableCell className={styles.tablePackName} onClick={handleGoToPack}>{packData.name}</TableCell>
            <TableCell align="center">{packData.cardsCount}</TableCell>
            <TableCell align="center">{getDate(packData.updated)}</TableCell>
            <TableCell align="center">{packData.user_name}</TableCell>
            <TableCell align="center">
                <div className={styles.itemActions}>
                    <button onClick={handleLearn} disabled={packData.cardsCount === 0}>
                        <img src={iconLearn}
                             alt={'learn'}
                             className={styles.actionsIcon}
                        />
                    </button>
                    {packData.user_id === userId &&
                        <button onClick={openEditHandler}>
                            <img src={iconEdit}
                                 alt={'icon'}
                                 className={styles.actionsIcon}
                            />
                        </button>}
                    {packData.user_id === userId &&
                        <button onClick={openDeleteHandler}>
                            <img src={iconDelete}
                                 alt={'icon'}
                                 className={styles.actionsIcon}
                            />
                        </button>}
                </div>
            </TableCell>
            {typeModal === 'edit' &&
                <EditPackModal title={'Edit pack'} openModal={openModal} closeHandler={closeHandler}
                               packData={packData}/>
            }
            {typeModal === 'delete' &&
                <DeletePackModal title={'Delete pack'} openModal={openModal} closeHandler={closeHandler}
                                 packData={packData}/>
            }
        </TableRow>

    );
})