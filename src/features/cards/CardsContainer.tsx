import React, {useEffect} from 'react';
import style from "./CardsListContainer.module.css";
import {Search} from "../../common/Search/Search";
import {Paginator} from "../../common/Paginator/Paginator";
import {BackArrowButton} from "../../common/BackArrowButton/BackArrowButton";
import {Path} from "../../common/enum/path";
import {CardsList} from "./cardsList/CardsList";
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/store";
import {getCardsTC} from "./cards-reducer";



export const testCardData = [
    {
        answer: 'answer 001',
        cardsPack_id: '001',
        updated: '2022-09-26T10:58:44.809Z',
        grade: 0,
        question: 'question 001',
        _id: '1001',
        user_id: '001'
    },
    {
        answer: 'answer 002',
        cardsPack_id: '002',
        updated: '2022-09-26T10:58:44.809Z',
        grade: 0,
        question: 'question 002',
        _id: '1002',
        user_id: '002'
    },
    {
        answer: 'answer 003',
        cardsPack_id: '003',
        updated: '2022-09-26T10:58:44.809Z',
        grade: 3,
        question: 'question 003',
        _id: '1003',
        user_id: '003'
    },
    {
        answer: 'answer 004',
        cardsPack_id: '004',
        updated: '2022-09-26T10:58:44.809Z',
        grade: 1,
        question: 'question 004',
        _id: '1004',
        user_id: '004'
    },
]

export const CardsContainer = () => {

  const dispatch = useAppDispatch()
  const cards = useAppSelector(state => state.cards.cards)
  const {packId} = useParams<'packId'>()

  useEffect(() => {
    packId && dispatch(getCardsTC(packId))
  },[])

    return (
        <div>

            <BackArrowButton path={Path.PACKS} title={'Back to Packs list'}/>

          <div className={style.wrapper}>
            <div className={style.tools}>
                <Search/>
            </div>

            <div className={style.cardsList}>
                <CardsList cardsList={cards} />
            </div>

            <Paginator
              portionSize={10}
              currentPage={2}
              totalItemsCount={100}
              pageSize={10}
              onPageChanged={() => {}}
            />
        </div>
        </div>
    );
};

