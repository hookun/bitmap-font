import {createSelector} from 'reselect';
import {FontState} from './type';

export const selectFont = ({Font}: {Font: FontState}): FontState => Font;
export const selectFontId = createSelector([selectFont], ({id}) => id);
export const selectFontName = createSelector([selectFont], ({name}) => name);
export const selectFontAscent = createSelector([selectFont], ({ascent}) => ascent);
export const selectFontDescent = createSelector([selectFont], ({descent}) => descent);
export const selectFontEditng = createSelector([selectFont], ({editing}) => editing);
export const selectFontWidth = createSelector([selectFont], ({width}) => width);
export const selectFontHeight = createSelector([selectFont], ({height}) => height);
export const selectFontEditorsStyle = createSelector(
    [selectFontWidth, selectFontHeight],
    (width, height) => ({
        '--Width': `${width.toFixed(1)}rem`,
        '--Height': `${height.toFixed(1)}rem`,
    }),
);
