import {useState, useEffect, useMemo} from 'react';
import {useSelector} from './old-core';
import {selectCharacter, selectMatrixData, selectFontName} from './selector';
import {defaultMatixData, defaultMatrix} from './constants';
import {decodeMatrix} from './matrix';
import {calculatePath} from './util/calculatePath';
import {createStore, LocalStore} from './util/createStore';
import {PathString} from './util/PathString';

export const useStore = <Type>(): LocalStore<Type> => {
    const fontName = useSelector(selectFontName);
    return useMemo(createStore, [fontName]) as LocalStore<Type>;
};

export const useMatrixData = (character: string): string => {
    const store = useStore<string>();
    const [matrixData, setMatrixData] = useState<string>('');
    useEffect(() => {
        store.get(character)
        .then((matrixData) => {
            setMatrixData(matrixData || defaultMatixData[character] || '');
        })
        .catch(console.error);
    }, [character, store]);
    const currentCharacter = useSelector(selectCharacter);
    const currentMatrixData = useSelector(selectMatrixData);
    useEffect(() => {
        if (character === currentCharacter) {
            setMatrixData(currentMatrixData);
        }
    }, [character, currentCharacter, currentMatrixData]);
    return matrixData;
};

export interface MatrixData extends ReturnType<typeof decodeMatrix> {
    matrixData: string,
}

export const useMatrix = (character: string): MatrixData => {
    const matrixData = useMatrixData(character);
    return {
        matrixData,
        ...(matrixData ? decodeMatrix(matrixData) : defaultMatrix),
    };
};

export interface MatrixDataAndPath extends MatrixData {
    d: PathString,
}

export const useMatrixAndPath = (character: string): MatrixDataAndPath => {
    const matrixData = useMatrix(character);
    const d = useMemo(
        () => calculatePath(matrixData.matrix, matrixData.width),
        [matrixData.matrix, matrixData.width],
    );
    return {...matrixData, d};
};
