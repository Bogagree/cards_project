import React, {ChangeEvent, useEffect, useState} from 'react';
import style from "./Search.module.css";
import {InputAdornment, OutlinedInput} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import {CardsParamsType} from "../../../../api/cards-api";
import {useAppDispatch, useAppSelector} from "../../../../app/store";
import {getPacksTC, PacksParamsType} from "../../../../features/packs/packs-reducer";
import {useDebounce} from "../../../Hooks/useDebounce";
import {getCardsTC} from '../../../../features/cards/cards-reducer';

export type SearchPropsType = {
    queryParams: PacksParamsType | CardsParamsType
    searchProperty: 'packName' | 'cardQuestion'
    cardsPack_id?: string
}

export const Search: React.FC<SearchPropsType> = React.memo(({queryParams, searchProperty}) => {
    const dispatch = useAppDispatch()

    const cardsPack_id = useAppSelector(state => state.cards.queryParams.cardsPack_id)

    const [searchText, setSearchText] = useState('');
    const debouncedSearchTerm = useDebounce(searchText, 500);

    const onChangeSearchHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSearchText(e.currentTarget.value)
    };

    useEffect(() => {

        if (debouncedSearchTerm === '' && searchProperty === 'packName') {
            dispatch(getPacksTC({...queryParams, [searchProperty]: ''}))
        }

        if (debouncedSearchTerm && searchProperty === 'packName') {
            dispatch(getPacksTC({...queryParams, [searchProperty]: debouncedSearchTerm}))
        }

        if (debouncedSearchTerm && searchProperty === 'cardQuestion') {
            dispatch(getCardsTC({...queryParams, cardsPack_id, [searchProperty]: debouncedSearchTerm}))
        }

    }, [debouncedSearchTerm])

    return (
        <div className={style.container}>

            <span className={style.toolTitle}>Search</span>

            <div>

                <OutlinedInput
                    className={style.input}
                    placeholder="Provide your text"
                    onChange={onChangeSearchHandler}
                    startAdornment={
                        <InputAdornment position="start">
                            <SearchIcon/>
                        </InputAdornment>
                    }

                />


            </div>

        </div>
    );
})