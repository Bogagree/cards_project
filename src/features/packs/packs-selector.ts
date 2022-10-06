import {AppStateType} from '../../app/store';
import {PacksParamsType} from './packs-reducer';


export const getMinPacksCount = (state: AppStateType): number =>
    state.packs.minCardsCount;
export const getMaxPacksCount = (state: AppStateType): number =>
    state.packs.maxCardsCount;
export const getPackQueryParams = (state: AppStateType): PacksParamsType =>
    state.packs.queryParams;