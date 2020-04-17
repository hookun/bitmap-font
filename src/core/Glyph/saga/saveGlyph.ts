import {Task} from 'redux-saga';
import {take, delay, cancel, fork, select, call, all} from 'redux-saga/effects';
import {getType, ActionType} from 'typesafe-actions';
import {SetGlyph} from '../action';
import {Glyph} from '../type';
import {DB} from '../../type';
import {selectDB} from '../../selector';
import {saveGlyph as saveGlyphToDB} from '../util/saveGlyph';
import {selectFontId} from '../../Font/selector';

export const save = function* (
    codePoint: number,
    glyph: Glyph,
    duration: number,
) {
    yield delay(duration);
    const [db, id]: [DB, string] = yield all([
        select(selectDB),
        select(selectFontId),
    ]);
    yield call(saveGlyphToDB, db, id, codePoint, glyph);
};

export const saveGlyph = function* () {
    const tasks = new Map<number, Task>();
    while (1) {
        const {payload: {codePoint, glyph}}: ActionType<typeof SetGlyph> = yield take(getType(SetGlyph));
        let task = tasks.get(codePoint);
        if (task) {
            yield cancel(task);
        }
        task = yield fork(save, codePoint, glyph, 500);
        tasks.set(codePoint, task);
    }
};
