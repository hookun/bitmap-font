import {select, call, put, all} from 'redux-saga/effects';
import {ActionType} from 'typesafe-actions';
import {SetFontName, SagaSetFont} from '../action';
import {selectDB} from '../../selector';
import {FontState} from '../type';
import {DB} from '../../type';
import {loadFont} from '../util/loadFont';
import {saveLastFontName} from '../util/saveLastFontName';

export const onSetFontName = function* ({payload: fontName}: ActionType<typeof SetFontName>) {
    const db: DB = yield select(selectDB);
    const [font]: [FontState] = yield all([
        call(loadFont, db, fontName),
        call(saveLastFontName, db, fontName),
    ]);
    yield put(SagaSetFont(font));
};
