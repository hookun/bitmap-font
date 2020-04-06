import {select, call, put} from 'redux-saga/effects';
import {selectDB} from '../../selector';
import {SetFontId} from '../action';
import {DB} from '../../type';
import {loadLastFontId} from '../util/loadLastFontId';

export const onRestart = function* () {
    const db: DB = yield select(selectDB);
    const id: string = yield call(loadLastFontId, db);
    yield put(SetFontId(id));
};
