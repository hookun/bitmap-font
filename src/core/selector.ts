import {createSelector} from 'reselect';
import {DBStore} from '../util/DBStore';
import {DBStoreNames, DB} from './type';

export const selectDBStoreNames = createSelector([], (): DBStoreNames => ({
    app: 'app',
    font: 'font',
    editor: 'editor',
    glyph: 'glyph',
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
                [names.font]: {keyPath: ['id']},
                [names.editor]: {keyPath: ['id']},
                [names.glyph]: {keyPath: ['id', 'codePoint']},
            },
        }),
    }),
);
