import {createSelector} from 'reselect';

export const selectCodePointRange = createSelector(
    [],
    () => [0x000000, 0x10FFFF],
);
