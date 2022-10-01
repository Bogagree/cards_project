import React, {ChangeEvent} from 'react';
import style from "../../../../features/packs/PacksListContainer.module.css";
import Pagination from "@mui/material/Pagination";
import {Box, FormControl, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {RequestStatusType} from "../../../../app/app-reducer";
import {useAppDispatch, useAppSelector} from "../../../../app/store";
import {setPacksParams} from "../../../../features/packs/packs-reducer";


export const Paginator = () => {
    const dispatch = useAppDispatch();

    const pageCount = useAppSelector(state => state.packs.pageCount)
    const page = useAppSelector(state => state.packs.queryParams.page)
    const cardPacksTotalCount = useAppSelector(state => state.packs.cardPacksTotalCount)
    const appStatus = useAppSelector(state => state.app.appStatus)

    const pageNumbers = Math.ceil(cardPacksTotalCount / pageCount);

    const onPageChange = (e: ChangeEvent<unknown>, page: number) => {
        dispatch(setPacksParams({page}));
    };

    const changePageCountSelectHandler = (event: SelectChangeEvent): void => {
        const pageCount = +event.target.value;
        dispatch(setPacksParams({pageCount}));
    };

    return (
        <div className={style.pagination}>

            <Pagination
                sx={{mt: '40px'}}
                shape="rounded"
                size="medium"
                page={page}
                count={pageNumbers}
                onChange={onPageChange}
                showFirstButton
                showLastButton
                disabled={appStatus === 'loading' as RequestStatusType}
            />

            <Box sx={{minWidth: 120}}>
                <FormControl
                    sx={{mt: '35px'}}
                    size="small"
                    variant="outlined"
                    disabled={appStatus === 'loading' as RequestStatusType}
                >
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={pageCount.toString()}
                        label="Age"
                        onChange={changePageCountSelectHandler}
                    >
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={25}>25</MenuItem>
                        <MenuItem value={50}>50</MenuItem>
                    </Select>
                </FormControl>
            </Box>
        </div>
    );
};