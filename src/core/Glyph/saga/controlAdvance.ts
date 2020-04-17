import {ActionType, getType} from 'typesafe-actions';
import {select, all, put} from 'redux-saga/effects';
import {IncrementAdvance, DecrementAdvance, SetGlyph} from '../action';
import {EditorState} from '../../Editor/type';
import {GlyphMap} from '../type';
import {selectEditor} from '../../Editor/selector';
import {selectGlyphMap} from '../selector';
import {getGlyph} from '../util/getGlyph';

export const controlAdvance = function* ({type}: ActionType<typeof IncrementAdvance | typeof DecrementAdvance>) {
    const [editor, map]: [EditorState, GlyphMap] = yield all([
        select(selectEditor),
        select(selectGlyphMap),
    ]);
    const {codePoint} = editor;
    if (codePoint === null) {
        return;
    }
    const glyph = getGlyph(map, codePoint, editor.advance);
    const advance = glyph.advance + (type === getType(IncrementAdvance) ? 1 : -1);
    yield put(SetGlyph({codePoint, glyph: {...glyph, advance}}));
};
