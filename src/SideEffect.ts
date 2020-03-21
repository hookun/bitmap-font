import {useEffect, createElement, Fragment, ReactElement} from 'react';
import {useSelector} from './core';
import {selectCharacter, selectMatrixData} from './selector';
import {useStore} from './use';

export const SaveCharacter = (): null => {
    const store = useStore();
    const character = useSelector(selectCharacter);
    useEffect(() => {
        store.set('character', character).catch(console.error);
    }, [character, store]);
    return null;
};

export const SaveMatrix = (): null => {
    const store = useStore();
    const character = useSelector(selectCharacter);
    const matrixData = useSelector(selectMatrixData);
    useEffect(() => {
        store.set(character, matrixData).catch(console.error);
    }, [character, matrixData, store]);
    return null;
};

export const SideEffects = (): ReactElement => createElement(
    Fragment,
    null,
    createElement(SaveCharacter),
    createElement(SaveMatrix),
);
