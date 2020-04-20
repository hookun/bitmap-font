import {ActionType, getType} from 'typesafe-actions';
import {select, all, put} from 'redux-saga/effects';
import {IncrementAdvance, DecrementAdvance, SetGlyph} from '../action';
import {GlyphMap} from '../type';
import {selectEditorCodePoint, selectEditorAdvance} from '../../Editor/selector';
import {selectGlyphMap} from '../selector';
import {getGlyph} from '../util/getGlyph';

export const controlAdvance = function* ({type}: ActionType<typeof IncrementAdvance | typeof DecrementAdvance>) {
    const [codePoint, currentAdvance, map]: [number, number, GlyphMap] = yield all([
        select(selectEditorCodePoint),
        select(selectEditorAdvance),
        select(selectGlyphMap),
    ]);
    if (codePoint === null) {
        return;
    }
    const glyph = getGlyph(map, codePoint, currentAdvance);
    const advance = glyph.advance + (type === getType(IncrementAdvance) ? 1 : -1);
    yield put(SetGlyph({codePoint, glyph: {...glyph, advance}}));
};
