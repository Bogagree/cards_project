import React from 'react';
import styles from './PacksList.module.css'
import {TableCell, TableRow} from "@mui/material";
import iconEdit from '../../../assets/icons/pencil.svg'
import iconDelete from '../../../assets/icons/iconDelete.png'
import iconLearn from '../../../assets/icons/iconLearn.png'
import {useNavigate} from "react-router-dom";
import {Path} from "../../../common/Enum/path";
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {PackType} from "../../../api/cards-api";
import {deletePackCardsTC, updatePackCardsTC} from "../packs-reducer";
import {setCardsParams, setPackIdAC} from "../../cards/cards-reducer";

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

    const handleGoToPack = () => {
        console.log('go to Pack')
        console.log('user cardsPack_id: ', userId)
        dispatch(setPackIdAC(packData._id))
        dispatch(setCardsParams({
            cardsPack_id: packData._id,
            pageCount: 15,
        }))
        navigate(`${Path.CARDS}/${packData._id}`)
    }

    const handleLearn = () => {
        console.log('learn pack')
    }

    const handleDelete = () => {
        console.log('delete pack')
        if (userId === packData.user_id) {
            dispatch(deletePackCardsTC(packData._id))
        }
    }
    const handleEdit = () => {
        console.log('edit pack')
        if (userId === packData.user_id) {
            dispatch(updatePackCardsTC({_id: packData._id, name: 'new name pack'}))
        }
    }

    return (
        <TableRow
            key={packData._id}
            sx={{'&:last-child td, &:last-child th': {border: 0}}}
        >
            <TableCell
                className={styles.tablePackName}
                onClick={handleGoToPack}
            >
                {packData.name}
            </TableCell>
            <TableCell align="center">{packData.cardsCount}</TableCell>
            <TableCell align="center">{getDate(packData.updated)}</TableCell>
            <TableCell align="center">{getDate(packData.created)}</TableCell>
            <TableCell align="center">
                <div className={styles.itemActions}>
                    <button
                        onClick={handleLearn}
                        disabled={packData.cardsCount === 0}
                    >
                        <img src={iconLearn}
                             alt={'icon'}
                             className={styles.actionsIcon}
                        />
                    </button>
                    {packData.user_id === userId &&
                        <button onClick={handleEdit}>
                            <img src={iconEdit}
                                 alt={'icon'}
                                 className={styles.actionsIcon}
                            />
                        </button>}
                    {packData.user_id === userId &&
                        <button onClick={handleDelete}>
                            <img src={iconDelete}
                                 alt={'icon'}
                                 className={styles.actionsIcon}
                            />
                        </button>}
                </div>
            </TableCell>
        </TableRow>
    );
});