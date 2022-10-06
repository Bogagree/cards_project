import React, {ChangeEvent} from 'react';
import style from "../../../../features/packs/PacksListContainer.module.css";
import Pagination from "@mui/material/Pagination";
import {Box, FormControl, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {RequestStatusType} from "../../../../app/app-reducer";
import {useAppSelector} from "../../../../app/store";

type PaginatorPropsType = {
    page: number
    totalElements: number
    pageCount: number
    onPaginationClick: (page: number) => void
    onSelectClick: (pageCount: number) => void
}


export const Paginator: React.FC<PaginatorPropsType> = React.memo(({
                                                                       page,
                                                                       pageCount,
                                                                       totalElements,
                                                                       onPaginationClick,
                                                                       onSelectClick
                                                                   }) => {

    const appStatus = useAppSelector(state => state.app.appStatus)

    const pageNumbers = Math.ceil(totalElements / pageCount);

    const onPageChange = (e: ChangeEvent<unknown>, page: number) => {
        onPaginationClick(page)
    };

    const changePageCountSelectHandler = (event: SelectChangeEvent): void => {
        const pageCount = +event.target.value;
        onSelectClick(pageCount)
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
});