import {select, call, put} from 'redux-saga/effects';
import {ActionType} from 'typesafe-actions';
import {selectDB} from '../../selector';
import {DB} from '../../type';
import {loadEditor} from '../util/loadEditor';
import {SetFontId} from '../../Font/action';
import {SagaSetEditor} from '../action';
import {EditorState} from '../type';

export const onSetFontId = function* ({payload: id}: ActionType<typeof SetFontId>) {
    const db: DB = yield select(selectDB);
    const editor: EditorState = yield call(loadEditor, db, id);
    yield put(SagaSetEditor(editor));
};
