import React, {useEffect, useState} from 'react';
import {PacksFilter} from "../../common/Components/Tools/PacksFilter/PacksFilter";
import {Search} from "../../common/Components/Tools/Search/Search";
import style from "./PacksListContainer.module.css"
import {DisableFilter} from "../../common/Components/Tools/DisableFilter/DisableFilter";
import {useAppDispatch, useAppSelector} from "../../app/store";
import {PacksList} from "./PacksList/PacksList";
import {Paginator} from "../../common/Components/Tools/Paginator/Paginator";
import {Preloader} from "../../common/Components/UI/Preloader/Preloader";
import {CardsNumberSlider} from "../../common/Components/UI/DoubleRangeSlider/CardsNumberSlider";
import {getPacksTC, setPacksParams} from "./packs-reducer";
import {CommonButton} from '../../common/Components/UI/Buttons/Button/CommonButton';
import {AddPackModal} from '../../common/Components/UI/Modals/PackModals/AddPackModal/AddPackModal';


export const Packs = (() => {

    const dispatch = useAppDispatch()
    const userId = useAppSelector(state => state.auth.user._id)

    const queryParams = useAppSelector(state => state.packs.queryParams)
    const maxCardsCount = useAppSelector(state => state.packs.maxCardsCount)
    const minCardsCount = useAppSelector(state => state.packs.minCardsCount)
    const cardPacksTotalCount = useAppSelector(state => state.packs.cardPacksTotalCount)
    const page = useAppSelector(state => state.packs.page)
    const pageCount = useAppSelector(state => state.packs.pageCount)

    const appStatus = useAppSelector(state => state.app.appStatus)

    const [openModal, setOpenModal] = useState(false);
    const openHandler = () => setOpenModal(true);
    const closeHandler = () => setOpenModal(false);

    const onChangePage = (page: number) => {
        dispatch(setPacksParams({...queryParams, page}))
    }

    const onChangePageCount = (pageCount: number) => {
        dispatch(setPacksParams({...queryParams, pageCount}))
    }


    useEffect(() => {
        // for 1st render dont get packs
        queryParams.hasOwnProperty('min')  &&
        dispatch(getPacksTC())
    }, [queryParams])

    return (
        <>
            <div className={style.wrapper}>
                <div className={style.packListHeader}>
                    <h2>Packs List</h2>
                    <CommonButton onClick={openHandler}>
                        Add new pack
                    </CommonButton>
                </div>

                <div className={style.tools}>

                    <Search
                        queryParams={queryParams}
                        searchProperty={'packName'}
                    />

                    <PacksFilter
                        userId={userId}
                    />
                    <CardsNumberSlider
                        minCardsCount={minCardsCount}
                        maxCardsCount={maxCardsCount}
                    />
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
            <AddPackModal title={'Add new pack'} openModal={openModal} closeHandler={closeHandler}/>
        </>
    )
        ;
});

