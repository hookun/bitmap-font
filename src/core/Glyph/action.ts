import {createAction} from 'typesafe-actions';
import {Glyph, GlyphEntry} from './type';

export const SagaSetGlyph = createAction('SagaSetGlyph')<Set<GlyphEntry>>();
export const SetGlyph = createAction('SetGlyph')<{
    codePoint: number,
    glyph: Glyph,
}>();
export const TogglePixel = createAction('TogglePixel')<{x: number, y: number}>();
export const IncrementAdvance = createAction('IncrementAdvance')();
export const DecrementAdvance = createAction('DecrementAdvance')();
