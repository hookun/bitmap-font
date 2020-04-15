// https://developer.apple.com/library/archive/documentation/TextFonts/Conceptual/CocoaTextArchitecture/FontHandling/FontHandling.html
import {createAction} from 'typesafe-actions';
import {FontState} from './type';

export const SagaSetFont = createAction('SagaSetFont')<FontState>();
export const SetFontId = createAction('SetFontId')<string>();
export const SetFontConfig = createAction('SetFontConfig')<{
    name: string,
    ascent: number,
    descent: number,
}>();
export const DeleteGlyph = createAction('DeleteGlyph')<number>();
export const TogglePixel = createAction('TogglePixel')<[number, number]>();
