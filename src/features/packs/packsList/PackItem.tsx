import React from 'react';
import styles from './PacksList.module.css'
import {TableCell, TableRow} from "@mui/material";
import iconEdit from '../../../assets/icons/pencil.svg'
import iconDelete from '../../../assets/icons/iconDelete.png'
import iconLearn from '../../../assets/icons/iconLearn.png'
import {useNavigate} from "react-router-dom";
import {Path} from "../../../common/enum/path";
import {useAppSelector} from "../../../app/store";
import {PackType} from "../../../api/cards-api";

type PropsType = {
  packData: PackType
}


export const PackItem: React.FC<PropsType> = ({packData}) => {

  const navigate = useNavigate()
  const userId = useAppSelector(state => state.auth.user._id)

  const getDate = (date: string) => {
    const day = new Date(date).getDate() < 10 ? `0${new Date(date).getDate()}` : new Date(date).getDate()
    const month = new Date(date).getMonth() + 1 < 10 ? `0${new Date(date).getMonth() + 1}` : new Date(date).getMonth() + 1
    const year = new Date(date).getFullYear()
    return `${day}.${month}.${year}`
  }

  const handleGoToPack = () => {
    navigate(`${Path.CARDS}/${packData._id}`)
  }
  const handleLearn = () => {
    console.log('learn pack')
  }
  const handleDelete = () => {
    console.log('delete pack')
  }
  const handleEdit = () => {
    console.log('edit pack')
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
};