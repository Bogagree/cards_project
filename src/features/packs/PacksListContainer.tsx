import React from 'react';
import {CardsNumberSlider} from "../../common/DoubleRangeSlider/CardsNumberSlider";
import {PacksFilter} from "../../common/PacksFilter/PacksFilter";
import {Search} from "../../common/Search/Search";
import style from "./PacksListContainer.module.css"
import {DisableFilter} from "../../common/DisableFilter/DisableFilter";
import {Paginator} from "../../common/Paginator/Paginator";

export const PacksListContainer = () => {
    return (
        <div>

            <div className={style.tools}>
                <Search/>
                <PacksFilter/>
                <CardsNumberSlider/>
                <DisableFilter/>
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

