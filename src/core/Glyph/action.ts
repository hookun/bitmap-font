import {createAction} from 'typesafe-actions';
import {Glyph, GlyphKey} from './type';

export const SetGlyph = createAction('SetGlyph')<Glyph>();
export const DeleteGlyph = createAction('DeleteGlyph')<GlyphKey>();
