import {take, put} from 'redux-saga/effects';
import {getType} from 'typesafe-actions';
import {SagaSetFont} from '../../Font/action';
import {SetEditorLoading} from '../action';

export const onRestart = function* () {
    yield put(SetEditorLoading(true));
    yield take(getType(SagaSetFont));
    yield put(SetEditorLoading(false));
};
