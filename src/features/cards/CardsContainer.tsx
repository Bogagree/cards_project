import React, {useEffect} from 'react';
import style from "./CardsListContainer.module.css";
import {Search} from "../../common/Search/Search";
import {Paginator} from "../../common/Paginator/Paginator";
import {BackArrowButton} from "../../common/BackArrowButton/BackArrowButton";
import {Path} from "../../common/enum/path";
import {CardsList} from "./cardsList/CardsList";
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/store";
import {createCardTC, getCardsTC} from "./cards-reducer";
import {Preloader} from "../../common/Preloader/Preloader";
import {CommonButton} from "../../common/Button/CommonButton";
import {AxiosResponse} from "axios";
import {CreatePackType, instance, NewCardsPackType} from "../../api/cards-api";



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
  const appStatus = useAppSelector(state => state.app.appStatus)
  const {packId} = useParams<'packId'>()

  const handleAddCard = () => {
    packId && dispatch(createCardTC({
      cardsPack_id: packId, question: 'new question', answer: 'new answer'
    }))
    console.log({
      cardsPack_id: packId, question: 'new question', answer: 'new answer'
    })
  }

  useEffect(() => {
    packId && dispatch(getCardsTC(packId))

    // instance.post<CreatePackType, AxiosResponse<NewCardsPackType>>('cards/pack', {cardsPack: {name: "My New Pack"}})
    //   .then(res => console.log(res))
  },[])

    return (
        <div className={style.wrapper}>
          <BackArrowButton path={Path.PACKS} title={'Back to Packs list'}/>
          <div className={style.cardsListHeader}>
          <h2>PackName</h2>
          <CommonButton onClick={handleAddCard}>Add Card</CommonButton>
        </div>

          {appStatus === 'loading' ? <Preloader /> :
            <div>
            <div className={style.tools}>
              <Search/>
            </div>

            <div className={style.cardsList}>
              <CardsList cardsList={cards}/>
            </div>

            <Paginator
              portionSize={10}
              currentPage={2}
              totalItemsCount={100}
              pageSize={10}
              onPageChanged={() => {
              }}
            />
          </div>}
        </div>
    );
};

