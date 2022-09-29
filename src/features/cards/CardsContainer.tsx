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

export const CardsContainer = () => {

  const dispatch = useAppDispatch()
  const cards = useAppSelector(state => state.cards.cards)
  const appStatus = useAppSelector(state => state.app.appStatus)
  const {packId} = useParams<'packId'>()
  const currentPack = useAppSelector(state => state.packs.cardPacks.find(p => p._id === packId))

  const handleAddCard = () => {
    packId && dispatch(createCardTC({
      cardsPack_id: packId, question: 'new question', answer: 'new answer'
    }))
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
          <h2>{currentPack?.name}</h2>
          <CommonButton disabled={appStatus === 'loading'} onClick={handleAddCard}>Add Card</CommonButton>
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

