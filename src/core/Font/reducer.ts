import {
    SetFontName,
    SetFontAscent,
    SetFontDescent,
    SagaSetFont,
    PickCharacter,
} from './action';
import {FontState} from './type';
import {createReducer, ActionType} from 'typesafe-actions';
import {patchFontState as patch} from './util/patchFontState';

export type GuideActionCreator =
| typeof SagaSetFont
| typeof SetFontName
| typeof SetFontAscent
| typeof SetFontDescent
| typeof PickCharacter;

export type GuideAction = ActionType<GuideActionCreator>;

export const defaultFont: FontState = {
    fontName: 'MyFont',
    ascent: 9,
    descent: 0,
    editing: [],
};

export const reducer = createReducer<FontState, GuideAction>(patch())
.handleAction(SagaSetFont, (state, {payload: fontState}) => patch(state, fontState))
.handleAction(SetFontName, (state, {payload: fontName}) => {
    return state.fontName === fontName ? state : patch(state, {fontName});
})
.handleAction(SetFontAscent, (state, {payload: ascent}) => {
    return state.ascent === ascent ? state : patch(state, {ascent});
})
.handleAction(SetFontDescent, (state, {payload: descent}) => {
    return state.descent === descent ? state : patch(state, {descent});
})
.handleAction(PickCharacter, (state, {payload: codePoint}) => {
    const {editing} = state;
    if (editing.includes(codePoint)) {
        return state;
    }
    return patch(state, {editing: editing.concat(codePoint)});
});
