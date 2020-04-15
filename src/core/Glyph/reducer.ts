import {
    SetGlyph,
    DeleteGlyph,
} from './action';
import {Glyph} from './type';
import {SetFontId} from '../Font/action';
import {createReducer, ActionType} from 'typesafe-actions';

export type GlyphActionCreator =
| typeof SetFontId
| typeof SetGlyph
| typeof DeleteGlyph;

export type GlyphAction = ActionType<GlyphActionCreator>;

export const reducer = createReducer<Map<number, ArrayBuffer>, GlyphAction>(new Map())
.handleAction(SetGlyph, (map, {payload: {codePoint, x, y}}) => {
    console.log(codePoint, x, y);
    return map;
});
