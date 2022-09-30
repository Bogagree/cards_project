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
import {PackMenu} from "./PackMenu";

export const CardsContainer = () => {

  const dispatch = useAppDispatch()
  const cards = useAppSelector(state => state.cards.cards)
  const appStatus = useAppSelector(state => state.app.appStatus)
  const userId = useAppSelector(state => state.auth.user._id)
  const packUserId = useAppSelector(state => state.cards.packUserId)
  const packName = useAppSelector(state => state.cards.packName)
  const {packId} = useParams<'packId'>()
  const myPack = userId === packUserId

  const handleAddCard = () => {
    packId && dispatch(createCardTC({
      cardsPack_id: packId, question: 'new question', answer: 'new answer'
    }))
  }

  useEffect(() => {
    packId && dispatch(getCardsTC(packId))
  }, [])

  return (
    <div className={style.wrapper}>
      <BackArrowButton path={Path.PACKS} title={'Back to Packs list'}/>
      <div className={style.cardsListHeader}>
        <div className={style.packMenu}>
          <h2>{packName}</h2>
          {myPack && <PackMenu/>}
        </div>
        {myPack &&
          <CommonButton
            onClick={handleAddCard}
            disabled={appStatus === 'loading'}
          >
            Add Card
          </CommonButton>}
      </div>

      {appStatus === 'loading' ? <Preloader/> :
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

