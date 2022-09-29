import React, {useEffect, useState} from 'react';
import {CardsNumberSlider} from "../../common/DoubleRangeSlider/CardsNumberSlider";
import {FilterType, PacksFilter} from "../../common/PacksFilter/PacksFilter";
import {Search} from "../../common/Search/Search";
import style from "./PacksListContainer.module.css"
import {DisableFilter} from "../../common/DisableFilter/DisableFilter";
import {Paginator} from "../../common/Paginator/Paginator";
import {PacksList} from "./packsList/PacksList";
import {useAppDispatch, useAppSelector} from "../../app/store";
import {createPackCardsTC, getPacksTC} from "./packs-reducer";
import {Preloader} from "../../common/Preloader/Preloader";
import {useNavigate, useParams} from "react-router-dom";
import {Path} from "../../common/enum/path";
import {CommonButton} from "../../common/Button/CommonButton";

export const testPacksListData = [
  {
    cardsCount: 0,
    created: "2022-09-26T19:39:37.156Z",
    grade: 0,
    more_id: "632ed6ddd2aeef10c8908d8b",
    name: "1",
    path: "/def",
    private: false,
    rating: 0,
    shots: 0,
    type: "pack",
    updated: "2022-09-26T19:39:37.156Z",
    user_id: "632ed6ddd2aeef10c8908d8b",
    user_name: "a",
    __v: 0,
    _id: "6331fff9174cfb0118ea9d4b"
  },
  {
    cardsCount: 0,
    created: "2022-09-26T19:14:57.809Z",
    grade: 0,
    more_id: "6328a8602e93f416e0e31d82",
    name: "12345 title test 12345",
    path: "/def",
    private: false,
    rating: 0,
    shots: 0,
    type: "pack",
    updated: "2022-09-26T19:15:28.783Z",
    user_id: "6328a8602e93f416e0e31d82",
    user_name: "aweaw",
    __v: 0,
    _id: "6331fa313d46fd2cd4d253eb"
  },
  {
    cardsCount: 3,
    created: "2022-09-26T15:15:41.072Z",
    grade: 0,
    more_id: "6328a8602e93f416e0e31d82",
    name: "test test test",
    path: "/def",
    private: false,
    rating: 0,
    shots: 0,
    type: "pack",
    updated: "2022-09-26T18:33:31.378Z",
    user_id: "6328a8602e93f416e0e31d82",
    user_name: "aweaw",
    __v: 0,
    _id: "6331c21d3d46fd2cd4d253e5",
  },
  {
    cardsCount: 17,
    created: "2022-09-26T09:26:35.044Z",
    deckCover: "url or base64",
    grade: 0,
    more_id: "63254ef1a16ae23408f00693",
    name: "1",
    path: "/def",
    private: false,
    rating: 0,
    shots: 0,
    type: "pack",
    updated: "2022-09-26T16:46:59.706Z",
    user_id: "63254ef1a16ae23408f00693",
    user_name: "engy",
    __v: 0,
    _id: "6331704b3c22f21db471fa5a",
  }
] // не удалять, потом перенесем в тесты

export const PacksListContainer = () => {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const {filter, currentPage} = useParams<'filter' | 'currentPage'>()

  const appStatus = useAppSelector(state => state.app.appStatus)
  const userId = useAppSelector(state => state.auth.user._id)
  const cardPacks = useAppSelector(state => state.packs.cardPacks)
  const [packsFilter, setPacksFilter] = useState(filter || '')
  const changeFilterCallback = (value: FilterType) => {
    if (value === 'my') {
      setPacksFilter(userId)
      navigate(`${Path.PACKS}/${userId}/${currentPage}`)
    } else {
      setPacksFilter('')
      navigate(`${Path.PACKS}`)
    }
  }
  const changePage = (p: number) => {
    navigate(`${Path.PACKS}/${filter}/${p}`)
  }
  const pageCount = useAppSelector(state => state.packs.pageCount)
  const handleAddPackList = () => {
    dispatch(createPackCardsTC())
  }

  useEffect(() => {
    console.log('rerender')
    dispatch(getPacksTC(
      packsFilter && packsFilter !== 'undefined' ? packsFilter : '',
      currentPage && currentPage !== 'undefined' ? Number(currentPage) : 1)
    )
  }, [packsFilter, filter, currentPage])

  return (
    <>
      {appStatus === 'loading' ? <Preloader/> :
        <div className={style.wrapper}>
          <div className={style.packListHeader}>
            <h2>Pack List</h2>
            <CommonButton
              onClick={handleAddPackList}
            >Add new pack</CommonButton>
          </div>
          <div className={style.tools}>
            <Search/>
            <PacksFilter
              filterValue={
                filter && filter !== 'undefined' ? 'my' : 'all'
              }
              changeFilter={changeFilterCallback}/>
            <CardsNumberSlider/>
            <DisableFilter/>
          </div>

          <PacksList/>

          <Paginator
            portionSize={pageCount}
            currentPage={Number(currentPage)}
            totalItemsCount={100}
            pageSize={pageCount}
            onPageChanged={changePage}/>
        </div>
      }
    </>
  )
    ;
};

