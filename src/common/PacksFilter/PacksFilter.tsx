import React, {useState} from 'react';
import style from './PacksFilter.module.css'

export type FilterType = 'all' | 'my'
type PropsType = {
  changeFilter: (value: FilterType) => void
}

export const PacksFilter: React.FC<PropsType> = ({changeFilter}) => {

    const [filter, setFilter] = useState<FilterType>('all')

    const myFilterHandler = () => {
        setFilter('my')
      changeFilter('my')
    };

    const allFilterHandler = () => {
        setFilter('all')
      changeFilter('all')
    };

    const allFilterCell = filter === 'all' ? `${style.filterCell} ${style.active}` : style.filterCell
    const myFilterCell = filter === 'my' ? `${style.filterCell} ${style.active}` : style.filterCell

    return (
        <div className={style.container}>

            <span className={style.toolTitle}>Number of cards</span>
            <div className={style.buttons}>
                <div onClick={myFilterHandler} className={myFilterCell}>My</div>
                <div onClick={allFilterHandler} className={allFilterCell}>All</div>
            </div>

        </div>
    );
};