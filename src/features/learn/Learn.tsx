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

  const cardData = useAppSelector(state => state.cards)
  const appStatus = useAppSelector(state => state.app.appStatus)
  const dispatch = useAppDispatch()
  const [answerIsShow, setAnswerIsShow] = useState(false)

  const handleShowAnswer = () => {
    setAnswerIsShow(true)
  }
  const handleNextQuestion = (value: number) => {
    setAnswerIsShow(false)
    dispatch(updateGradeTC({grade: value, card_id: cardData.learnCard._id}))
    dispatch(getRandomCardAC(cardData.cards))
  }

  useEffect(() => {
    dispatch(getCardsTC())
  }, [])
  useEffect(() => {
    dispatch(getRandomCardAC(cardData.cards))
  }, [cardData.cards])

  if(appStatus === 'loading'){
    return <Preloader />
  }

  return (
    <div className={style.wrapper}>
      <BackArrowButton path={Path.PACKS} title={'Back to Packs list'}/>
      <h2>{cardData.packName}</h2>
      <div className={style.inner}>
          <Question
            question={cardData.learnCard.question}
            shots={cardData.learnCard.shots}
          />
        {answerIsShow ?
          <Answer nextQuestionCallback={handleNextQuestion} answer={cardData.learnCard.answer}/> :
          <CommonButton onClick={handleShowAnswer}>Show answer</CommonButton>
        }
      </div>
    </div>
  );
};

