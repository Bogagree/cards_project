import React from 'react';
import style from "./CardsListContainer.module.css";
import {Search} from "../../common/Search/Search";
import {Paginator} from "../../common/Paginator/Paginator";
import {BackArrowButton} from "../../common/BackArrowButton/BackArrowButton";
import {Path} from "../../common/enum/path";

export const CardsContainer = () => {
    return (
        <div>

            <BackArrowButton path={Path.PACKS} title={'Back to Packs list'}/>

            <div className={style.tools}>
                <Search/>
            </div>

            <Paginator
                portionSize={10}
                currentPage={2}
                totalItemsCount={100}
                pageSize={10}
                onPageChanged={() => {}}
            />

        </div>
    );
};

