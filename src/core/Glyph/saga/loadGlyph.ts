import {take, select, all, call, put} from 'redux-saga/effects';
import {getType} from 'typesafe-actions';
import {SagaSetEditor, OpenEditor, OpenEditors} from '../../Editor/action';
import {selectGlyphMap} from '../selector';
import {GlyphMap, GlyphEntry} from '../type';
import {DB} from '../../type';
import {selectDB} from '../../selector';
import {selectFontId} from '../../Font/selector';
import {loadGlyph as loadGlyphFromDB} from '../util/loadGlyph';
import {SagaSetGlyph} from '../action';
import {selectEditngCodePoints} from '../../Editor/selector';

export const loadGlyph = function* () {
    while (1) {
        yield take([SagaSetEditor, OpenEditor, OpenEditors].map(getType));
        const [map, editing]: [GlyphMap, Array<number>] = yield all([
            select(selectGlyphMap),
            select(selectEditngCodePoints),
        ]);
        const toBeLoaded = editing.filter((codePoint) => !map.has(codePoint));
        if (0 < toBeLoaded.length) {
            const [db, id]: [DB, string] = yield all([
                select(selectDB),
                select(selectFontId),
            ]);
            const loaded: Set<GlyphEntry> = yield call(loadGlyphFromDB, db, id, toBeLoaded);
            yield put(SagaSetGlyph(loaded));
        }
    }
};
