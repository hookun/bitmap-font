import {createAction} from 'typesafe-actions';
import {Glyph, GlyphEntry} from './type';

export const SagaSetGlyph = createAction('SagaSetGlyph')<Set<GlyphEntry>>();
export const SetGlyph = createAction('SetGlyph')<{
    codePoint: number,
    glyph: Glyph,
}>();
export const DeleteGlyph = createAction('DeleteGlyph')<number>();
export const FillPixel = createAction('FillPixel')<{x: number, y: number}>();
export const ClearPixel = createAction('ClearPixel')<{x: number, y: number}>();
export const TogglePixel = createAction('TogglePixel')<{x: number, y: number}>();
export const IncrementAdvance = createAction('IncrementAdvance')();
export const DecrementAdvance = createAction('DecrementAdvance')();
