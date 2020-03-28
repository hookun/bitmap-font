import {createSelector} from 'reselect';
import {FontState} from './type';

export const selectFont = ({Font}: {Font: FontState}): FontState => Font;
export const selectFontName = createSelector([selectFont], ({fontName}) => fontName);
export const selectFontAscent = createSelector([selectFont], ({ascent}) => ascent);
export const selectFontDescent = createSelector([selectFont], ({descent}) => descent);
export const selectFontEdting = createSelector([selectFont], ({editing}) => editing);
