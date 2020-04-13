import {createSelector} from 'reselect';
import {FontState} from './type';

export const selectFont = ({Font}: {Font: FontState}): FontState => Font;
export const selectFontId = createSelector([selectFont], ({id}) => id);
export const selectFontName = createSelector([selectFont], ({name}) => name);
export const selectFontAscent = createSelector([selectFont], ({ascent}) => ascent);
export const selectFontDescent = createSelector([selectFont], ({descent}) => descent);
