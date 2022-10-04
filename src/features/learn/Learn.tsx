import React, {ChangeEvent, useState} from 'react';
import {BackArrowButton} from "../../common/Components/UI/Buttons/BackArrowButton/BackArrowButton";
import {Path} from "../../common/Enum/path";
import {CommonButton} from "../../common/Components/UI/Buttons/Button/CommonButton";
import {CommonCheckbox} from "../../common/Components/UI/Checkbox/CommonCheckbox";

const choiceAnswerArr = [
  {
    title: 'Did not know',
    grade: '1'
  },
  {
    title: 'Forgot',
    grade: '2'
  },
  {
    title: 'A lot of thought',
    grade: '3'
  },
  {
    title: 'Confused',
    grade: '4'
  },
  {
    title: 'Knew the answer',
    grade: '5'
  },
]

export const Learn = () => {

  const [choiceAnswer, setChoiceAnswer] = useState(`${choiceAnswerArr[0].grade}`)
  const [answerIsShow, setAnswerIsShow] = useState(false)
  const handleChoiceAnswer = (e: ChangeEvent<HTMLInputElement>) => {
    setChoiceAnswer(e.currentTarget.id)
  }

  const handleShowAnswer = () => {
    setAnswerIsShow(true)
  }
  const handleNextQuestion = () => {

  }

  return (
    <div>
      <BackArrowButton path={Path.PACKS} title={'Back to Packs list'}/>
      <h2>Learn - Pack Name</h2>
      <div>
        <h4>question: Lorem ipsum dolor sit amet.</h4>
        <p>Количество попыток ответов на вопрос: 0</p>

        {!answerIsShow ?
          <CommonButton
            onClick={handleShowAnswer}
          >
            Show answer
          </CommonButton> :
          <>
            <h4>answer: Lorem ipsum dolor sit amet.</h4>
            <p>Rate yourself:</p>

            {choiceAnswerArr.map(answer => (
              <CommonCheckbox
                key={answer.grade}
                onChange={handleChoiceAnswer}
                checked={choiceAnswer === answer.grade}
                id={`${answer.grade}`}
              >
                {answer.title}
              </CommonCheckbox>
            ))}
            <CommonButton
              onClick={handleNextQuestion}
            >
              Next
            </CommonButton>
          </>
        }


      </div>
    </div>
  );
};

