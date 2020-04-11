// https://developer.apple.com/library/archive/documentation/TextFonts/Conceptual/CocoaTextArchitecture/FontHandling/FontHandling.html
import {createAction} from 'typesafe-actions';
import {FontState} from './type';

export const SagaSetFont = createAction('SagaSetFont')<FontState>();
export const SetFontId = createAction('SetFontId')<string>();
export const SetFontConfig = createAction('SetFontConfig')<{
    name: string,
    ascent: number,
    descent: number,
    width: number,
    height: number,
}>();
export const OpenEditors = createAction('OpenEditors')<string>();
export const OpenEditor = createAction('OpenEditor')<number>();
export const CloseEditor = createAction('CloseEditor')<number>();
