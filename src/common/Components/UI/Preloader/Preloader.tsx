import React from 'react';
import pacmanPreloader from "../../../../assets/svg/Bean Eater-1s-200px.svg";
import style from "./Preloader.module.css";


export const Preloader: React.FC = ({}) => {
    return (
        <div>
            <img
                src={pacmanPreloader}
                alt="page_isFetching_img"
                className={style.preloader}/>
        </div>
    );
};