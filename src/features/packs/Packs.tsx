import React, {useEffect} from 'react';
import {PacksFilter} from "../../common/Components/Tools/PacksFilter/PacksFilter";
import {Search} from "../../common/Components/Tools/Search/Search";
import style from "./PacksListContainer.module.css"
import {DisableFilter} from "../../common/Components/Tools/DisableFilter/DisableFilter";
import {useAppDispatch, useAppSelector} from "../../app/store";
import {getPacksTC, setPacksParams} from "./packs-reducer";
import {PacksList} from "./PacksList/PacksList";
import {Paginator} from "../../common/Components/Tools/Paginator/Paginator";
import {Preloader} from "../../common/Components/UI/Preloader/Preloader";
import {CardsNumberSlider} from "../../common/Components/UI/DoubleRangeSlider/CardsNumberSlider";
import {AddPackModal} from '../../common/Components/UI/Modals/AddPackModal/AddPackModal';

export const Packs = () => {

    const dispatch = useAppDispatch()

    const userId = useAppSelector(state => state.auth.user._id)
    const queryParams = useAppSelector(state => state.packs.queryParams)
    const cardPacksTotalCount = useAppSelector(state => state.packs.cardPacksTotalCount)
    const page = useAppSelector(state => state.packs.page)
    const pageCount = useAppSelector(state => state.packs.pageCount)

    const appStatus = useAppSelector(state => state.app.appStatus)

    console.log('packs render')

    const onChangePage = (page: number) => {
        dispatch(getPacksTC({...queryParams, page}))
        dispatch(setPacksParams({...queryParams, page}))
    }
    const onChangePageCount = (pageCount: number) => {
        dispatch(getPacksTC({...queryParams, pageCount}))
        dispatch(setPacksParams({...queryParams, pageCount}))
    }

    useEffect(() => {
        dispatch(setPacksParams({...queryParams}))
    }, [])

    return (
        <>
            <div className={style.wrapper}>
                <div className={style.packListHeader}>
                    <h2>Packs List</h2>
                    <AddPackModal nameButton={'Add new pack'} title={'Add new pack'}/>
                </div>

                <div className={style.tools}>

                    <Search
                        queryParams={queryParams}
                        searchProperty={'packName'}
                    />

                    <PacksFilter
                        userId={userId}
                    />
                    <CardsNumberSlider/>
                    <DisableFilter/>
                </div>
                {appStatus === 'loading'
                    ? <Preloader/>
                    : <PacksList/>
                }
                <Paginator
                    page={page}
                    pageCount={pageCount}
                    totalElements={cardPacksTotalCount}
                    onPaginationClick={onChangePage}
                    onSelectClick={onChangePageCount}
                />

            </div>

        </>
    )
        ;
};

