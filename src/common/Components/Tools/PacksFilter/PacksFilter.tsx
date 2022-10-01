import React, {useState} from 'react';
import style from './PacksFilter.module.css'
import {useNavigate} from "react-router-dom";
import {Path} from "../../../Enum/path";

export type FilterType = 'all' | 'my'

type PropsType = {
  packsUserId: string
  userId: string
}

export const PacksFilter: React.FC<PropsType> = ({packsUserId, userId}) => {

  const navigate = useNavigate()
    const [filter, setFilter] = useState<FilterType>(packsUserId === '' ? 'all' : 'my')

    const myFilterHandler = () => {
        setFilter('my')
      if(packsUserId){
        navigate(`${Path.PACKS}/${packsUserId}`)
      }else{
        navigate(`${Path.PACKS}/${userId}`)
      }

    };

    const allFilterHandler = () => {
        setFilter('all')
      navigate(Path.PACKS)
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