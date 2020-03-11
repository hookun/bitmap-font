import * as idb from 'idb-keyval';
import {useContext, createContext, Dispatch} from 'react';
import {Selector} from 'reselect';
import {decodeMatrix} from './matrix';
import {PathGeneratorState} from './type';
import {PathGeneratorAction} from './action';
import {createStore} from './util/createStore';
import {defaultMatrix, defaultMatixData} from './constants';

export const createInitialState = async (): Promise<PathGeneratorState> => {
    let fontName = (await idb.get<string>('bitmap-font-name')) || 'default';
    const store = createStore(fontName);
    const character = (await store.get<string | undefined>('character')) || 'あ';
    const matrixData = (await store.get<string | undefined>(character)) || defaultMatixData[character] || '';
    const {width, height, matrix} = matrixData ? decodeMatrix(matrixData) : defaultMatrix
    let pathDirection = false;
    return {
        fontName: 'default',
        arrowSize: 0.5,
        arrowLength: 1.5,
        maxCellSize: 40,
        width,
        height,
        matrix,
        page: 'かな',
        character,
        cellNumber: false,
        pathDirection,
        grid: true,
        exportFormat: '',
    };
};

export const StateContext = createContext<[PathGeneratorState, Dispatch<PathGeneratorAction>]>(undefined);
export const useDispatch = () => useContext(StateContext)[1];
export const useSelector = <Type>(selector: Selector<PathGeneratorState, Type>) => {
    const [state] = useContext(StateContext);
    return selector(state);
};
