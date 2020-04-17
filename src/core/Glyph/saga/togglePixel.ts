import {ActionType} from 'typesafe-actions';
import {select, all, put} from 'redux-saga/effects';
import {TogglePixel, SetGlyph} from '../action';
import {selectEditor} from '../../Editor/selector';
import {EditorState} from '../../Editor/type';
import {projectPosition} from '../../util/projectPosition';
import {selectGlyphMap} from '../selector';
import {GlyphMap} from '../type';
import {getGlyph} from '../util/getGlyph';
import {getColumn} from '../util/getColumn';

export const togglePixel = function* ({payload: point}: ActionType<typeof TogglePixel>) {
    const [editor, map]: [EditorState, GlyphMap] = yield all([
        select(selectEditor),
        select(selectGlyphMap),
    ]);
    const {codePoint} = editor;
    if (codePoint === null) {
        return;
    }
    const {origin, size} = projectPosition(editor);
    const columnIndex = Math.floor((point.x - origin[0]) / size);
    const rowIndex = Math.floor((point.y - origin[1]) / size);
    const glyph = getGlyph(map, codePoint, editor.advance);
    const column = getColumn(glyph, columnIndex);
    if (column.has(rowIndex)) {
        column.delete(rowIndex);
    } else {
        column.add(rowIndex);
    }
    glyph.pixels.set(columnIndex, column);
    yield put(SetGlyph({codePoint, glyph}));
};
