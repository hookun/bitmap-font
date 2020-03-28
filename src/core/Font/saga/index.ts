import {takeEvery, debounce} from 'redux-saga/effects';
import {getType} from 'typesafe-actions';
import {onRestart} from './onRestart';
import {onSetFontName} from './onSetFontName';
import {onUpdateFont} from './onUpdateFont';
import {Restart} from '../../action';
import {
    SetFontName,
    SetFontAscent,
    SetFontDescent,
    PickCharacter,
} from '../action';

export const list = () => [
    takeEvery(getType(Restart), onRestart),
    takeEvery(getType(SetFontName), onSetFontName),
    debounce(
        500,
        [
            SetFontAscent,
            SetFontDescent,
            PickCharacter,
        ].map(getType),
        onUpdateFont,
    ),
];
