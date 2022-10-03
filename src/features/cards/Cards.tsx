import React, {useEffect} from 'react';
import style from "./Cards.module.css";
import {Search} from "../../common/Components/Tools/Search/Search";
import {BackArrowButton} from "../../common/Components/UI/Buttons/BackArrowButton/BackArrowButton";
import {Path} from "../../common/Enum/path";
import {CardsList} from "./cardsList/CardsList";
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/store";
import {createCardTC, getCardsTC} from "./cards-reducer";
import {CommonButton} from "../../common/Components/UI/Buttons/Button/CommonButton";
import {PackMenu} from "./PackMenu";
import {Preloader} from "../../common/Components/UI/Preloader/Preloader";

export const Cards = () => {

    const dispatch = useAppDispatch()
    const userId = useAppSelector(state => state.auth.user._id)
    const appStatus = useAppSelector(state => state.app.appStatus)

    const cards = useAppSelector(state => state.cards.cards)
    const packUserId = useAppSelector(state => state.cards.packUserId)
    const packName = useAppSelector(state => state.cards.packName)
    const packId = useAppSelector(state => state.cards.packId)

    // const {packId} = useParams<'packId'>()
    const myPack = userId === packUserId

    const handleAddCard = () => {
        packId && dispatch(createCardTC({
            cardsPack_id: packId, question: 'new question', answer: 'new answer'
        }))
    }

    useEffect(() => {
        packId && dispatch(getCardsTC({cardsPack_id: packId}))
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
                        onClick={handleAddCard}
                        disabled={appStatus === 'loading'}
                    >
                        Add Card
                    </CommonButton>}
            </div>

            {appStatus === 'loading' ? <Preloader/> :
                <div>
                    <div className={style.tools}>
                        <Search
                            queryParams={{cardsPack_id: packId}}
                            searchProperty={'cardQuestion'}
                        />
                    </div>

                    <div className={style.cardsList}>
                        <CardsList cardsList={cards}/>
                    </div>

                </div>}
        </div>
    );
};

