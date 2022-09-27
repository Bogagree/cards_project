import React from 'react';
import {TableCell, TableRow} from "@mui/material";
import star from '../../../assets/icons/star.png'
import editIcon from '../../../assets/icons/pencil.svg'
import deleteIcon from '../../../assets/icons/iconDelete.png'
import styles from './CardsList.module.css'
import {testCardData} from "../CardsContainer";

type PropsType = {
  cardData: CardType
  userId: string
}
type CardType = typeof testCardData[0]

export const Card: React.FC<PropsType> = ({cardData, userId}) => {

  const getDate = (date: string) => {
    const day = new Date(date).getDate() < 10 ? `0${new Date(date).getDate()}` : new Date(date).getDate()
    const month = new Date(date).getMonth() + 1 < 10 ? `0${new Date(date).getMonth() + 1}` : new Date(date).getMonth() + 1
    const year = new Date(date).getFullYear()
    return `${day}.${month}.${year}`
  }

  const handleChangeCard = () => {
    console.log('change card - ' + cardData._id)
  }
  const handleRemoveCard = () => {
    console.log('remove card - ' + cardData._id)
  }


  return (
    <TableRow
      key={'packData._id'}
      sx={{'&:last-child td, &:last-child th': {border: 0}}}
    >
      <TableCell
        component="th"
        scope="row"
      >
        {cardData.question}
      </TableCell>
      <TableCell align="center">{cardData.answer}</TableCell>
      <TableCell align="center">{getDate(cardData.updated)}</TableCell>
      <TableCell align="center">
        <img src={star} alt={'star'}/>
        <img src={star} alt={'star'}/>
        <img src={star} alt={'star'}/>
        <img src={star} alt={'star'}/>
        <img src={star} alt={'star'}/>
      </TableCell>
      {cardData.user_id !== userId &&
        <TableCell align="center">
          <div className={styles.itemActions}>
            <img src={editIcon}
                 alt={'editIcon'}
                 className={styles.actionsIcon}
                 onClick={handleChangeCard}
            />
            <img src={deleteIcon}
                 alt={'deleteIcon'}
                 className={styles.actionsIcon}
                 onClick={handleRemoveCard}
            />
          </div>
        </TableCell>}
    </TableRow>
  );
};