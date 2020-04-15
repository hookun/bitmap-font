import {createAction} from 'typesafe-actions';
import {Glyph, GlyphKey} from './type';

export const SetGlyph = createAction('SetGlyph')<Glyph>();
export const DeleteGlyph = createAction('DeleteGlyph')<GlyphKey>();
export const TogglePixel = createAction('TogglePixel')<{
    x: number,
    y: number,
}>();
