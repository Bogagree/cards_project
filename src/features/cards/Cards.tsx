import React, {useEffect, useState} from 'react';
import style from "./Cards.module.css";
import {Search} from "../../common/Components/Tools/Search/Search";
import {BackArrowButton} from "../../common/Components/UI/Buttons/BackArrowButton/BackArrowButton";
import {Path} from "../../common/Enum/path";
import {CardsList} from "./cardsList/CardsList";
import {useAppDispatch, useAppSelector} from "../../app/store";
import {getCardsTC} from "./cards-reducer";
import {CommonButton} from "../../common/Components/UI/Buttons/Button/CommonButton";
import {PackMenu} from "./PackMenu";
import {Preloader} from "../../common/Components/UI/Preloader/Preloader";
import {AddCardModal} from '../../common/Components/UI/Modals/CardModals/AddCardModal/AddCardModal';
import {ResetCardsSearch} from './ResetCardsSearch/ResetCardsSearch';

export const Cards = () => {

    const dispatch = useAppDispatch()

    const userId = useAppSelector(state => state.auth.user._id)
    const appStatus = useAppSelector(state => state.app.appStatus)
    const packUserId = useAppSelector(state => state.cards.packUserId)
    const packName = useAppSelector(state => state.cards.packName)
    const packId = useAppSelector(state => state.cards.packId)
    const queryParams = useAppSelector(state => state.cards.queryParams)
    const cardsList = useAppSelector(state => state.cards.cards)

    const isMyPack = userId === packUserId

    const [openModal, setOpenModal] = useState(false);
    const openHandler = () => setOpenModal(true);
    const closeHandler = () => setOpenModal(false);

    useEffect(() => {
        dispatch(getCardsTC())
    }, [queryParams])

    return (
        <div className={style.wrapper}>

            <BackArrowButton path={Path.PACKS} title={'Back to Packs list'}/>
            <div className={style.cardsListHeader}>
                <div className={style.packMenu}>
                    <h2>{packName}</h2>
                    {
                        <PackMenu
                            packId={packId ? packId : ''}
                            isMyPack={isMyPack}
                        />
                    }
                </div>
                {
                    isMyPack &&
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
                        <Search
                            queryParams={queryParams}
                            searchProperty={'cardQuestion'}
                        />
                        <ResetCardsSearch/>
                    </div>

                    <div className={style.cardsList}>
                        <CardsList cardsList={cardsList}/>
                    </div>

                </div>}
            <AddCardModal title={'Add new card'} openModal={openModal} closeHandler={closeHandler} packId={packId}/>
        </div>
    );
};

