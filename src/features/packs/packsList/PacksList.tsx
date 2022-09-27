import React from 'react';
import styles from './PacksList.module.css'
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {PackItem} from "./PackItem";
import {testPacksListData} from "../PacksListContainer";



type PropsType = {
  packsList: Array<typeof testPacksListData[0]>
}

export const PacksList: React.FC<PropsType> = ({packsList}) => {

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
          <TableBody>
            {packsList.map((item) => (
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