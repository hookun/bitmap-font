import {Task} from 'redux-saga';
import {select, call, all, put, take, delay, cancel, fork} from 'redux-saga/effects';
import {getType} from 'typesafe-actions';
import {selectDB} from '../../selector';
import {selectEditor} from '../selector';
import {saveEditor} from '../util/saveEditor';
import {DB} from '../../type';
import {EditorState} from '../type';
import {
    SagaSetEditor,
    ReleaseEditor,
    ResetEditor,
    OpenEditors,
    OpenEditor,
    CloseEditor,
    SetEditorSaving,
    SetEditorGrid,
    SetEditorConfig,
} from '../action';
import {loadEditor} from '../util/loadEditor';
import {isSameObject} from '../../util/isSameObject';
import {mask} from '../util/mask';

export const save = function* () {
    yield delay(500);
    const [db, current]: [DB, EditorState] = yield all([
        select(selectDB),
        select(selectEditor),
    ]);
    const currentMasked = mask(current);
    const oldMasked = mask(yield call(loadEditor, db, current.id));
    if (!isSameObject(currentMasked, oldMasked)) {
        yield put(SetEditorSaving(true));
        yield call(saveEditor, db, current);
        yield put(SetEditorSaving(false));
    }
};

export const saveChanges = function* () {
    let task: Task | null = null;
    while (1) {
        yield take([
            SagaSetEditor,
            ReleaseEditor,
            ResetEditor,
            OpenEditors,
            OpenEditor,
            CloseEditor,
            SetEditorGrid,
            SetEditorConfig,
        ].map(getType));
        if (task) {
            yield cancel(task);
            task = null;
        }
        task = yield fork(save);
    }
};
