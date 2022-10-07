import React from 'react';

type PropsType = {
  question: string
  shots: number
}

export const Question: React.FC<PropsType> = ({question, shots}) => {
  return (
    <>
      <h4>Question: {question}</h4>
      <p>Количество попыток ответов на вопрос: {shots}</p>
    </>
  );
};

