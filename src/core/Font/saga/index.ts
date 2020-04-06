import {takeEvery, debounce} from 'redux-saga/effects';
import {getType} from 'typesafe-actions';
import {onRestart} from './onRestart';
import {onSetFontId} from './onSetFontId';
import {onUpdateFont} from './onUpdateFont';
import {Restart} from '../../action';
import {
    SagaSetFont,
    SetFontId,
    OpenEditor,
    CloseEditor,
    SetFontConfig,
} from '../action';

export const list = () => [
    takeEvery(getType(Restart), onRestart),
    takeEvery(getType(SetFontId), onSetFontId),
    debounce(
        500,
        [
            SagaSetFont,
            SetFontConfig,
            OpenEditor,
            CloseEditor,
        ].map(getType),
        onUpdateFont,
    ),
];
