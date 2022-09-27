import React from 'react';
import style from "./Search.module.css";
import {InputAdornment, OutlinedInput} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';



export const Search = () => {
    return (
        <div className={style.container}>

            <span className={style.toolTitle}>Search</span>

            <div>

                <OutlinedInput
                    className={style.input}
                    placeholder="Provide your text"
                    startAdornment={
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    }
                />


            </div>

        </div>
    );
};