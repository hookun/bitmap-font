import {controlEditorMessage} from './controlEditorMessage';
import {takeEvery} from 'redux-saga/effects';
import {getType} from 'typesafe-actions';
import {SetFontId} from '../../Font/action';
import {onSetFontId} from './onSetFontId';
import {Restart} from '../../action';
import {onRestart} from './onRestart';
import {saveChanges} from './saveChanges';

export const list = () => [
    takeEvery(getType(Restart), onRestart),
    takeEvery(getType(SetFontId), onSetFontId),
    controlEditorMessage(),
    saveChanges(),
];
