import {Task} from 'redux-saga';
import {take, cancel, fork, delay, put} from 'redux-saga/effects';
import {getType, ActionType} from 'typesafe-actions';
import {SetEditorMessage, ClearEditorMessage} from '../action';

export const setTimer = function* (
    codePoint: number,
    duration: number,
) {
    yield delay(duration);
    yield put(ClearEditorMessage(codePoint));
};

export const controlEditorMessage = function* () {
    let task: Task | null = null;
    while (1) {
        const {
            payload: {codePoint, duration},
        }: ActionType<typeof SetEditorMessage> = yield take(getType(SetEditorMessage));
        if (task) {
            yield cancel(task);
            task = null;
        }
        if (0 < duration) {
            task = yield fork(setTimer, codePoint, duration);
        }
    }
};
