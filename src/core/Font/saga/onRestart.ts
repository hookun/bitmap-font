import {select, call, put} from 'redux-saga/effects';
import {selectDB} from '../../selector';
import {SetFontName} from '../action';
import {DB} from '../../type';
import {loadLastFontName} from '../util/loadLastFontName';

export const onRestart = function* () {
    const db: DB = yield select(selectDB);
    const fontName: string = yield call(loadLastFontName, db);
    yield put(SetFontName(fontName));
};
