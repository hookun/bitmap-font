import {select, call} from 'redux-saga/effects';
import {selectDB} from '../../selector';
import {SetGlyph} from '../action';
import {DB} from '../../type';
import {ActionType} from 'typesafe-actions';
import {saveGlyph} from '../util/saveGlyph';

export const onSetGlyph = function* ({payload: glyph}: ActionType<typeof SetGlyph>) {
    const db: DB = yield select(selectDB);
    yield call(saveGlyph, db, glyph);
};
