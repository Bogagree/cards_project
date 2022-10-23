import React from 'react';
import styles from './PacksList.module.css'
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {useAppSelector} from "../../../app/store";
import {Preloader} from "../../../common/Components/UI/Preloader/Preloader";
import {PackItem} from "./PackItem/PackItem";

export const PacksList: React.FC = () => {

    const appStatus = useAppSelector(state => state.app.appStatus)
    const cardsPacks = useAppSelector(state => state.packs.cardPacks)

    return (
        <div>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead className={styles.tableHead}>
                        <TableRow>
                            <TableCell align='center'>Cover</TableCell>
                            <TableCell>Pack Name</TableCell>
                            {['Cards Count', 'Last Update', 'Created By', 'Actions'].map(cell =>
                                <TableCell key={cell} align="center">{cell}</TableCell>
                            )}
                        </TableRow>
                    </TableHead>

                    {appStatus === 'loading' ? <Preloader/> : ''}
                    <TableBody>
                        {cardsPacks.map((item) => (
                            <PackItem
                                key={item._id}
                                packData={item}/>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}