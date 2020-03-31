// https://developer.apple.com/library/archive/documentation/TextFonts/Conceptual/CocoaTextArchitecture/FontHandling/FontHandling.html
import {createAction} from 'typesafe-actions';
import {FontState} from './type';

export const SagaSetFont = createAction('SagaSetFont')<FontState>();
export const SetFontName = createAction('SetFontName')<string>();
export const SetFontAscent = createAction('SetFontAscent')<number>();
export const SetFontDescent = createAction('SetFontDescent')<number>();
export const OpenEditors = createAction('OpenEditors')<string>();
export const OpenEditor = createAction('OpenEditor')<number>();
export const CloseEditor = createAction('CloseEditor')<number>();
