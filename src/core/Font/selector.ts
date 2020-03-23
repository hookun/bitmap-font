import {createSelector} from 'reselect';
import {FontState} from './type';

export const selectFont = ({Guide}: {Guide: FontState}): FontState => Guide;
export const selectFontName = createSelector([selectFont], ({name}) => name);
export const selectFontAscent = createSelector([selectFont], ({ascent}) => ascent);
export const selectFontDescent = createSelector([selectFont], ({descent}) => descent);
