import React, {useState} from 'react';
import {TableCell, TableRow} from "@mui/material";
import star from '../../../assets/icons/star.png'
import editIcon from '../../../assets/icons/pencil.svg'
import deleteIcon from '../../../assets/icons/iconDelete.png'
import styles from './CardsList.module.css'
import {useAppDispatch} from "../../../app/store";
import {CardsType} from "../../../api/cards-api";
import {EditCardModal} from '../../../common/Components/UI/Modals/CardModals/EditCardModal/EditCardModal';
import {DeleteCardModal} from '../../../common/Components/UI/Modals/CardModals/DeleteCardModal/DeleteCardModal';

type PropsType = {
  cardData: CardsType
  userId: string
}

export const Card: React.FC<PropsType> = ({cardData, userId}) => {

  const dispatch = useAppDispatch()

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

  const getDate = (date: string) => {
    const day = new Date(date).getDate() < 10 ? `0${new Date(date).getDate()}` : new Date(date).getDate()
    const month = new Date(date).getMonth() + 1 < 10 ? `0${new Date(date).getMonth() + 1}` : new Date(date).getMonth() + 1
    const year = new Date(date).getFullYear()
    return `${day}.${month}.${year}`
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
      {cardData.user_id === userId &&
        <TableCell align="center">
          <div className={styles.itemActions}>
            <img src={editIcon}
                 alt={'editIcon'}
                 className={styles.actionsIcon}
                 onClick={openEditHandler}
            />
            <img src={deleteIcon}
                 alt={'deleteIcon'}
                 className={styles.actionsIcon}
                 onClick={openDeleteHandler}
            />
          </div>
        </TableCell>}
      { typeModal === 'edit' &&
          <EditCardModal title={'Edit card'} openModal={openModal} closeHandler={closeHandler} cardData={cardData}/>
      }
      { typeModal === 'delete' &&
          <DeleteCardModal title={'Delete card'} openModal={openModal} closeHandler={closeHandler} cardData={cardData}/>
      }
    </TableRow>
  );
};