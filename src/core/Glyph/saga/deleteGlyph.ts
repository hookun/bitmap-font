import {select, call, all, put} from 'redux-saga/effects';
import {ActionType} from 'typesafe-actions';
import {DeleteGlyph} from '../action';
import {DB} from '../../type';
import {selectDB} from '../../selector';
import {deleteGlyph as deleteGlyphFromDB} from '../util/deleteGlyph';
import {selectFontId} from '../../Font/selector';
import {CloseEditor} from '../../Editor/action';

export const deleteGlyph = function* ({payload: codePoint}: ActionType<typeof DeleteGlyph>) {
    const confirmed: boolean = yield call(
        confirm,
        [
            String.fromCodePoint(codePoint),
            `(${codePoint.toString(16).padStart(4, '0')})`,
            'のグリフのデータを消します。元に戻せません。よろしいですか？',
        ].join(' '),
    );
    if (!confirmed) {
        return;
    }
    const [db, id]: [DB, string] = yield all([
        select(selectDB),
        select(selectFontId),
    ]);
    yield put(CloseEditor(codePoint));
    yield call(deleteGlyphFromDB, db, id, codePoint);
};
