import {createSelector} from 'reselect';
import {DBStore} from '../util/DBStore';
import {DBStoreNames, DB} from './type';

export const selectDBStoreNames = createSelector([], (): DBStoreNames => ({
    app: 'app',
    font: 'font',
    gryph: 'gryph',
}));
export const selectDB = createSelector(
    [selectDBStoreNames],
    (names): DB => ({
        names,
        store: new DBStore({
            name: 'bitmap-font',
            version: 1,
            stores: {
                [names.app]: null,
                [names.font]: {keyPath: ['fontName']},
                [names.gryph]: {keyPath: ['fontName', 'codePoint']},
            },
        }),
    }),
);