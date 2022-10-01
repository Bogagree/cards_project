import React from 'react';
import styles from './PacksList.module.css'
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {PackItem} from "./PackItem";
import {useAppSelector} from "../../../app/store";
import {Preloader} from "../../../common/Preloader/Preloader";

export const PacksList: React.FC = () => {

  const cardPacks = useAppSelector(state => state.packs.cardPacks)
  const appStatus = useAppSelector(state => state.app.appStatus)


  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead className={styles.tableHead}>
            <TableRow>
              <TableCell>Pack Name</TableCell>
              <TableCell align="center">Cards Count</TableCell>
              <TableCell
                align="center">
                Last Update
              </TableCell>
              <TableCell align="center">Created By</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>

          {appStatus === 'loading' ? <Preloader/> : ''}
          <TableBody>
            { cardPacks.map((item) => (
              <PackItem
                key={item._id}
                packData={item} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};