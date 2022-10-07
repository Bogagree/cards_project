import React, {useEffect, useState} from 'react';
import {BackArrowButton} from "../../common/Components/UI/Buttons/BackArrowButton/BackArrowButton";
import {Path} from "../../common/Enum/path";
import {CommonButton} from "../../common/Components/UI/Buttons/Button/CommonButton";
import style from './Learn.module.css'
import {Answer} from "./answer/Answer";
import {useAppDispatch, useAppSelector} from "../../app/store";
import {getCardsTC, getRandomCardAC, updateGradeTC} from "../cards/cards-reducer";
import {Question} from "./question/Question";
import {Preloader} from "../../common/Components/UI/Preloader/Preloader";


export const Learn = () => {

  const packName = useAppSelector(state => state.cards.packName)
  const cardData = useAppSelector(state => state.cards)
  const learnCard = useAppSelector(state => state.cards.learnCard)
  const appStatus = useAppSelector(state => state.app.appStatus)
  const dispatch = useAppDispatch()
  const [answerIsShow, setAnswerIsShow] = useState(false)

  const handleShowAnswer = () => {
    setAnswerIsShow(true)
  }
  const handleNextQuestion = (value: number) => {
    setAnswerIsShow(false)
    dispatch(updateGradeTC({grade: value, card_id: learnCard._id}))
    dispatch(getRandomCardAC(cardData.cards))
  }

  useEffect(() => {
    dispatch(getCardsTC())
  }, [])
  useEffect(() => {
    dispatch(getRandomCardAC(cardData.cards))
  }, [cardData.cards])

  return (
    <div className={style.wrapper}>
      <BackArrowButton path={Path.PACKS} title={'Back to Packs list'}/>
      <h2>{packName}</h2>
      {cardData && <div className={style.inner}>
        {appStatus === 'loading' ? <Preloader/> :<>
          {learnCard && <Question
            question={learnCard.question}
            shots={learnCard.shots}
          />}

        {!answerIsShow ?
          <CommonButton onClick={handleShowAnswer}>Show answer</CommonButton> :
          <Answer nextQuestionCallback={handleNextQuestion} answer={learnCard.answer}/>
        }
        </>
        }
      </div>}
    </div>
  );
};

