import React, {useState} from 'react';
import style from "./Paginator.module.css";

export type PaginatorPropsType = {
    totalItemsCount: number
    pageSize: number
    currentPage: number
    portionSize: number
    onPageChanged: (p: number) => void
}

export const Paginator: React.FC<PaginatorPropsType> = (
    {
        totalItemsCount,
        currentPage,
        pageSize,
        onPageChanged,
        portionSize = 10
    }) => {

    const [portionNumber, setPortionNumber] = useState(1)

    let pagesCount = Math.ceil(totalItemsCount / pageSize)

    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    let portionCount = Math.ceil(pagesCount / portionSize)

    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    const rightPortionPageNumber = portionNumber * portionSize

    const leftClickHandler = () => {
        setPortionNumber(portionNumber - 1)
    }

    const rightClickHandler = () => {
        setPortionNumber(portionNumber + 1)
    }


    return (
        <div className={style.paginator}>
            {portionNumber > 1 &&
                <>
                    <button onClick={() => {
                        setPortionNumber(1)
                    }}> {'<<'}</button>
                    <button onClick={leftClickHandler}>{'<'}</button>
                </>
            }

            {pages
                .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map(p => {

                    return <span
                        key={p}
                        className={currentPage === p ? style.pageNumber + ' ' + style.selectedPage : style.pageNumber}
                        onClick={() => {onPageChanged(p)}}>{p}</span>
                })}

            {portionNumber < portionCount &&
                <>
                    <button onClick={rightClickHandler}> {'>'} </button>
                    <button onClick={() => {
                        setPortionNumber(portionCount)
                    }}>last
                    </button>
                </>
            }

        </div>
    );
};
