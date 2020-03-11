import {useState, useEffect, useMemo} from 'react';
import {useSelector} from './core';
import {selectCharacter, selectMatrixData, selectFontName} from './selector';
import {defaultMatixData, defaultMatrix} from './constants';
import {decodeMatrix} from './matrix';
import {calculatePath} from './util/calculatePath';
import {createStore} from './util/createStore';

export const useMatrixData = (character: string): string => {
    const store = useStore();
    const [matrixData, setMatrixData] = useState<string>('');
    useEffect(() => {
        store.get<string>(character)
        .then((matrixData) => {
            setMatrixData(matrixData || defaultMatixData[character] || '');
        })
        .catch(console.error);
    }, [character]);
    const currentCharacter = useSelector(selectCharacter);
    const currentMatrixData = useSelector(selectMatrixData);
    useEffect(() => {
        if (character === currentCharacter) {
            setMatrixData(currentMatrixData);
        }
    }, [character, currentCharacter, currentMatrixData]);
    return matrixData;
};

export const useMatrix = (character: string) => {
    const matrixData = useMatrixData(character);
    return {
        matrixData,
        ...useMemo(() => matrixData ? decodeMatrix(matrixData) : defaultMatrix, [matrixData]),
    };
};

export const useMatrixAndPath = (character: string) => {
    const matrixData = useMatrix(character);
    const d = useMemo(() => calculatePath(matrixData.matrix, matrixData.width), [matrixData]);
    return {...matrixData, d};
};

export const useStore = () => {
    const fontName = useSelector(selectFontName);
    return useMemo(createStore, [fontName]);
};
