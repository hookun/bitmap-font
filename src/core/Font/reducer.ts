import {
    SetFontName,
    SetFontAscent,
    SetFontDescent,
    SagaSetFont,
    OpenEditor,
    CloseEditor,
    OpenEditors,
} from './action';
import {FontState} from './type';
import {createReducer, ActionType} from 'typesafe-actions';
import {patchFontState as patch} from './util/patchFontState';
import {isPrintable} from '../../util/isPrintable';

export type FontActionCreator =
| typeof SagaSetFont
| typeof SetFontName
| typeof SetFontAscent
| typeof SetFontDescent
| typeof OpenEditors
| typeof OpenEditor
| typeof CloseEditor;

export type FontAction = ActionType<FontActionCreator>;

export const reducer = createReducer<FontState, FontAction>(patch())
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
.handleAction(OpenEditors, (state, {payload: characters}) => {
    const {editing} = state;
    const newCodePoints: Array<number> = [];
    for (const character of characters) {
        const codePoint = character.codePointAt(0);
        if (!editing.includes(codePoint) && isPrintable(codePoint)) {
            newCodePoints.push(codePoint);
        }
    }
    if (newCodePoints.length === 0) {
        return state;
    }
    return patch(state, {editing: [...editing, ...newCodePoints]});
})
.handleAction(OpenEditor, (state, {payload: codePoint}) => {
    const {editing} = state;
    if (editing.includes(codePoint) || !isPrintable(codePoint)) {
        return state;
    }
    return patch(state, {editing: editing.concat(codePoint)});
})
.handleAction(CloseEditor, (state, {payload: codePoint}) => {
    const {editing} = state;
    const index = editing.indexOf(codePoint);
    if (index < 0) {
        return state;
    }
    return patch(
        state,
        {editing: [...editing.slice(0, index), ...editing.slice(index + 1)]},
    );
});
