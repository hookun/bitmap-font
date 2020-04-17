import {takeEvery} from 'redux-saga/effects';
import {TogglePixel, IncrementAdvance, DecrementAdvance} from '../action';
import {togglePixel} from './togglePixel';
import {controlAdvance} from './controlAdvance';
import {saveGlyph} from './saveGlyph';
import {loadGlyph} from './loadGlyph';

export const list = () => [
    takeEvery(TogglePixel, togglePixel),
    takeEvery([IncrementAdvance, DecrementAdvance], controlAdvance),
    saveGlyph(),
    loadGlyph(),
];
