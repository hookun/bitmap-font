import {ActionType} from 'typesafe-actions';
import {select, all, put} from 'redux-saga/effects';
import {TogglePixel, SetGlyph} from '../action';
import {selectEditorProjected, selectEditorCodePoint, selectEditorAdvance} from '../../Editor/selector';
import {selectGlyphMap} from '../selector';
import {GlyphMap} from '../type';
import {getGlyph} from '../util/getGlyph';
import {getColumn} from '../util/getColumn';

export const togglePixel = function* ({payload: point}: ActionType<typeof TogglePixel>) {
    const [{ox, oy, size}, codePoint, advance, map]: [
        ReturnType<typeof selectEditorProjected>,
        number,
        number,
        GlyphMap,
    ] = yield all([
        select(selectEditorProjected),
        select(selectEditorCodePoint),
        select(selectEditorAdvance),
        select(selectGlyphMap),
    ]);
    if (codePoint === null) {
        return;
    }
    const columnIndex = Math.floor((point.x - ox) / size);
    const rowIndex = Math.floor((point.y - oy) / size);
    const glyph = getGlyph(map, codePoint, advance);
    const column = getColumn(glyph, columnIndex);
    if (column.has(rowIndex)) {
        column.delete(rowIndex);
    } else {
        column.add(rowIndex);
    }
    glyph.pixels.set(columnIndex, column);
    yield put(SetGlyph({codePoint, glyph}));
};
