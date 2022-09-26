import React from 'react';
import styles from './PacksListContainer.module.css'
import {PacksList} from "./packsList/PacksList";

export const PacksListContainer = () => {
    return (
        <div className={styles.wrapper}>
          <PacksList />
        </div>
    );
};

