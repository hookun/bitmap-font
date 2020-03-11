import {useEffect, createElement, Fragment} from 'react';
import {useSelector} from './core';
import {selectCharacter, selectMatrixData} from './selector';
import {useStore} from './use';

export const SaveCharacter = () => {
    const store = useStore();
    const character = useSelector(selectCharacter);
    useEffect(() => {
        store.set('character', character).catch(console.error);
    }, [character]);
    return null;
};

export const SaveMatrix = () => {
    const store = useStore();
    const character = useSelector(selectCharacter);
    const matrixData = useSelector(selectMatrixData);
    useEffect(() => {
        store.set(character, matrixData).catch(console.error);
    }, [character, matrixData]);
    return null;
};

export const SideEffects = () => createElement(
    Fragment,
    null,
    createElement(SaveCharacter),
    createElement(SaveMatrix),
);
