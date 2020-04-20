import {
    SetGlyph,
    SagaSetGlyph,
    DeleteGlyph,
} from './action';
import {GlyphMap} from './type';
import {createReducer, ActionType} from 'typesafe-actions';
import {CloseEditor} from '../Editor/action';

export type GlyphActionCreator =
| typeof SagaSetGlyph
| typeof CloseEditor
| typeof SetGlyph
| typeof DeleteGlyph;

export type GlyphAction = ActionType<GlyphActionCreator>;

export const reducer = createReducer<GlyphMap, GlyphAction>(new Map())
.handleAction(SagaSetGlyph, (oldMap, {payload: added}) => {
    const map = new Map(oldMap);
    for (const {codePoint, glyph} of added) {
        map.set(codePoint, glyph);
    }
    return map;
})
.handleAction(CloseEditor, (oldMap, {payload: codePoint}) => {
    const map = new Map(oldMap);
    map.delete(codePoint);
    return map;
})
.handleAction(SetGlyph, (oldMap, {payload: {codePoint, glyph}}) => {
    const map = new Map(oldMap);
    map.set(codePoint, glyph);
    return map;
})
.handleAction(DeleteGlyph, (oldMap, {payload: codePoint}) => {
    const map = new Map(oldMap);
    map.delete(codePoint);
    return map;
});
