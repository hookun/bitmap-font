import {
    SetFontName,
    SetFontAscent,
    SetFontDescent,
    $SetFont,
} from './action';
import {FontState} from './type';
import {createReducer, ActionType} from 'typesafe-actions';

export type GuideActionCreator =
| typeof $SetFont
| typeof SetFontName
| typeof SetFontAscent
| typeof SetFontDescent;

export type GuideAction = ActionType<GuideActionCreator>;

export const defaultFont: FontState = {
    fontName: 'MyFont',
    ascent: 9,
    descent: 0,
};

export const reducer = createReducer<FontState, GuideAction>(defaultFont)
.handleAction($SetFont, (_, {payload: fontState}) => fontState)
.handleAction(SetFontName, (state, {payload: fontName}) => {
    return state.fontName === fontName ? state : {...state, fontName};
})
.handleAction(SetFontAscent, (state, {payload: ascent}) => {
    return state.ascent === ascent ? state : {...state, ascent};
})
.handleAction(SetFontDescent, (state, {payload: descent}) => {
    return state.descent === descent ? state : {...state, descent};
});
