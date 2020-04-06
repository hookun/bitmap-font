import {select, call, put, all} from 'redux-saga/effects';
import {ActionType} from 'typesafe-actions';
import {SetFontId, SagaSetFont} from '../action';
import {selectDB} from '../../selector';
import {FontState} from '../type';
import {DB} from '../../type';
import {loadFont} from '../util/loadFont';
import {saveLastFontId} from '../util/saveLastFontId';

export const onSetFontId = function* ({payload: id}: ActionType<typeof SetFontId>) {
    const db: DB = yield select(selectDB);
    const [font]: [FontState] = yield all([
        call(loadFont, db, id),
        call(saveLastFontId, db, id),
    ]);
    yield put(SagaSetFont(font));
};
