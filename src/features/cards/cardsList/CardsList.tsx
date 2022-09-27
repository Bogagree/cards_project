import React from 'react';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import styles from './CardsList.module.css';
import {Card} from "./Card";
import {useAppSelector} from "../../../app/store";
import {testCardData} from "../CardsContainer";
import {Preloader} from "../../../common/Preloader/Preloader";

type PropsType = {
  cardsList: Array<typeof testCardData[0]>
}

export const CardsList: React.FC<PropsType> = ({cardsList}) => {

  const userId = useAppSelector(state => state.auth.user._id)
  const appStatus = useAppSelector(state => state.app.appStatus)
  const cardsPackUserId = '001'

  return (
    <div>
      {appStatus === 'loading' ? <Preloader/> :
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead className={styles.tableHead}>
            <TableRow>
              <TableCell>Question</TableCell>
              <TableCell align="center">Answer</TableCell>
              <TableCell
                align="center">
                Last Update
              </TableCell>
              <TableCell align="center">Grade</TableCell>
              {cardsPackUserId !== userId && <TableCell align="center"></TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {cardsList.map((item) => (
              <Card
                key={item._id}
                userId={userId}
                cardData={item} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>}
    </div>
  );
};