import {takeEvery} from 'redux-saga/effects';
import {
    TogglePixel,
    IncrementAdvance,
    DecrementAdvance,
    DeleteGlyph,
} from '../action';
import {togglePixel} from './togglePixel';
import {controlAdvance} from './controlAdvance';
import {saveGlyph} from './saveGlyph';
import {loadGlyph} from './loadGlyph';
import {deleteGlyph} from './deleteGlyph';

export const list = () => [
    takeEvery(TogglePixel, togglePixel),
    takeEvery(DeleteGlyph, deleteGlyph),
    takeEvery([IncrementAdvance, DecrementAdvance], controlAdvance),
    saveGlyph(),
    loadGlyph(),
];
