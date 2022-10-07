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
  answer: string
}

export const Answer: React.FC<PropsType> = ({nextQuestionCallback, answer}) => {

  const [choiceAnswer, setChoiceAnswer] = useState(choiceAnswerArr[0].grade)

  const handleChoiceAnswer = (e: ChangeEvent<HTMLInputElement>) => {
    setChoiceAnswer(Number(e.currentTarget.value))
  }
  const handleNext = () => {
    nextQuestionCallback(choiceAnswer)
  }

  useEffect(() => {

  },[])

  return (
    <>
      <h4>Answer: {answer}</h4>
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