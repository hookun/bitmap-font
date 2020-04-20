import {ActionType, getType} from 'typesafe-actions';
import {select, all, put} from 'redux-saga/effects';
import {TogglePixel, SetGlyph, FillPixel, ClearPixel} from '../action';
import {selectEditorProjected, selectEditorCodePoint, selectEditorAdvance} from '../../Editor/selector';
import {selectGlyphMap} from '../selector';
import {GlyphMap} from '../type';
import {getGlyph} from '../util/getGlyph';
import {getColumn} from '../util/getColumn';

type PixelAction = 
| typeof TogglePixel
| typeof FillPixel
| typeof ClearPixel;

export const togglePixel = function* ({type, payload: point}: ActionType<PixelAction>) {
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
    const filled = column.has(rowIndex);
    switch (type) {
        case getType(FillPixel):
            if (filled) {
                return;
            }
            break;
        case getType(ClearPixel):
            if (!filled) {
                return;
            }
            break;
        default:
    }
    if (filled) {
        column.delete(rowIndex);
    } else {
        column.add(rowIndex);
    }
    glyph.pixels.set(columnIndex, column);
    yield put(SetGlyph({codePoint, glyph}));
};
