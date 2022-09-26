import React from 'react';
import styles from './CardsContainer.module.css'
import {CardsList} from "./cardsList/CardsList";

export const testCardData = [
  {
    answer: 'answer 001',
    cardsPack_id: '001',
    updated: '2022-09-26T10:58:44.809Z',
    grade: 0,
    question: 'question 001',
    _id: '1001',
    user_id: '001'
  },
  {
    answer: 'answer 002',
    cardsPack_id: '002',
    updated: '2022-09-26T10:58:44.809Z',
    grade: 0,
    question: 'question 002',
    _id: '1002',
    user_id: '002'
  },
  {
    answer: 'answer 003',
    cardsPack_id: '003',
    updated: '2022-09-26T10:58:44.809Z',
    grade: 3,
    question: 'question 003',
    _id: '1003',
    user_id: '003'
  },
  {
    answer: 'answer 004',
    cardsPack_id: '004',
    updated: '2022-09-26T10:58:44.809Z',
    grade: 1,
    question: 'question 004',
    _id: '1004',
    user_id: '004'
  },
]

export const CardsContainer = () => {
    return (
        <div className={styles.wrapper}>
          <CardsList cardsList={testCardData} />
        </div>
    );
};

