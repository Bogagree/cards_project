import React, {useEffect, useState} from 'react';
import {BackArrowButton} from "../../common/Components/UI/Buttons/BackArrowButton/BackArrowButton";
import {Path} from "../../common/Enum/path";
import {CommonButton} from "../../common/Components/UI/Buttons/Button/CommonButton";
import style from './Learn.module.css'
import {Answer} from "./answer/Answer";

export const Learn = () => {

  const [answerIsShow, setAnswerIsShow] = useState(false)

  const handleShowAnswer = () => {
    setAnswerIsShow(true)
  }
  const handleNextQuestion = (value: number) => {
    setAnswerIsShow(false)
    console.log('dispatch set answer: ' + value)
  }

  useEffect(() => {
    console.log('rerender Learn')
  },[])

  return (
    <div className={style.wrapper}>
      <BackArrowButton path={Path.PACKS} title={'Back to Packs list'}/>
      <h2>Learn - Pack Name</h2>
      <div className={style.inner}>
        <h4>question: Lorem ipsum dolor sit amet.</h4>
        <p>Количество попыток ответов на вопрос: 0</p>

        {!answerIsShow ?
          <CommonButton onClick={handleShowAnswer}>Show answer</CommonButton> :
          <Answer nextQuestionCallback={handleNextQuestion}/>
        }
      </div>
    </div>
  );
};

