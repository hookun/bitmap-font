// https://developer.apple.com/library/archive/documentation/TextFonts/Conceptual/CocoaTextArchitecture/FontHandling/FontHandling.html
import {createAction} from 'typesafe-actions';
import {FontState} from './type';

export const SagaSetFont = createAction('SagaSetFont')<FontState>();
export const SetFontName = createAction('SetFontName')<string>();
export const SetFontAscent = createAction('SetFontAscent')<number>();
export const SetFontDescent = createAction('SetFontDescent')<number>();
export const PickCharacter = createAction('PickCharacter')<number>();
