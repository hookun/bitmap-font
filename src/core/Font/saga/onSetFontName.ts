import {select, call, put} from 'redux-saga/effects';
import {ActionType} from 'typesafe-actions';
import {SetFontName, SagaSetFont} from '../action';
import {selectDB} from '../../selector';
import {FontState} from '../type';
import {DB} from '../../type';
import {loadFont} from '../util/loadFont';

export const onSetFontName = function* ({payload: fontName}: ActionType<typeof SetFontName>) {
    const db: DB = yield select(selectDB);
    const font: FontState = yield call(loadFont, db, fontName);
    yield put(SagaSetFont(font));
};
