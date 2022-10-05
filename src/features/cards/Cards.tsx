import React, {useEffect, useState} from 'react';
import style from "./Cards.module.css";
import {Search} from "../../common/Components/Tools/Search/Search";
import {BackArrowButton} from "../../common/Components/UI/Buttons/BackArrowButton/BackArrowButton";
import {Path} from "../../common/Enum/path";
import {CardsList} from "./cardsList/CardsList";
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/store";
import {getCardsTC} from "./cards-reducer";
import {CommonButton} from "../../common/Components/UI/Buttons/Button/CommonButton";
import {PackMenu} from "./PackMenu";
import {Preloader} from "../../common/Components/UI/Preloader/Preloader";
import {AddCardModal} from '../../common/Components/UI/Modals/CardModals/AddCardModal/AddCardModal';

export const Cards = () => {

  const dispatch = useAppDispatch()
  const cards = useAppSelector(state => state.cards.cards)
  const appStatus = useAppSelector(state => state.app.appStatus)
  const userId = useAppSelector(state => state.auth.user._id)
  const packUserId = useAppSelector(state => state.cards.packUserId)
  const packName = useAppSelector(state => state.cards.packName)
  const {packId} = useParams<'packId'>()
  const myPack = userId === packUserId

  const [openModal, setOpenModal] = useState(false);
  const openHandler = () => setOpenModal(true);
  const closeHandler = () => setOpenModal(false);

  useEffect(() => {
    packId && dispatch(getCardsTC(packId))
  }, [])

  return (
    <div className={style.wrapper}>
      <BackArrowButton path={Path.PACKS} title={'Back to Packs list'}/>
      <div className={style.cardsListHeader}>
        <div className={style.packMenu}>
          <h2>{packName}</h2>
          {myPack && <PackMenu packId={packId ? packId : ''}/>}
        </div>
        {myPack &&
          <CommonButton
            onClick={openHandler}
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

        </div>}
      <AddCardModal title={'Add new card'} openModal={openModal} closeHandler={closeHandler} packId={packId}/>
    </div>
  );
};

