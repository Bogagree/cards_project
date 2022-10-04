import React, {ChangeEvent, useEffect, useState} from 'react';
import {CommonCheckbox} from "../../../common/Components/UI/Checkbox/CommonCheckbox";
import {CommonButton} from "../../../common/Components/UI/Buttons/Button/CommonButton";

const choiceAnswerArr = [
  {
    title: 'Did not know',
    grade: 1
  },
  {
    title: 'Forgot',
    grade: 2
  },
  {
    title: 'A lot of thought',
    grade: 3
  },
  {
    title: 'Confused',
    grade: 4
  },
  {
    title: 'Knew the answer',
    grade: 5
  },
]

type PropsType = {
  nextQuestionCallback: (value: number) => void
}

export const Answer: React.FC<PropsType> = ({nextQuestionCallback}) => {

  const [choiceAnswer, setChoiceAnswer] = useState(choiceAnswerArr[0].grade)

  const handleChoiceAnswer = (e: ChangeEvent<HTMLInputElement>) => {
    setChoiceAnswer(Number(e.currentTarget.value))
  }
  const handleNext = () => {
    nextQuestionCallback(choiceAnswer)
  }

  useEffect(() => {
    console.log('rerender Answer')
  },[])

  return (
    <>
      <h4>answer: Lorem ipsum dolor sit amet.</h4>
      <p>Rate yourself:</p>

      {choiceAnswerArr.map(answer => (
        <CommonCheckbox
          key={answer.grade}
          onChange={handleChoiceAnswer}
          checked={choiceAnswer === answer.grade}
          value={answer.grade}
        >
          {answer.title}
        </CommonCheckbox>
      ))}
      <CommonButton
        onClick={handleNext}
      >
        Next
      </CommonButton>
    </>
  );
};