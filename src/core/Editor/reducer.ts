import {SetFontName} from '../Font/action';
import {createReducer, ActionType} from 'typesafe-actions';
import {
    EnterEditor,
    LeaveEditor,
    OpenEditorMenu,
    CloseEditorMenu,
    ToggleEditorMenu,
    SetEditorMessage,
    ClearEditorMessage,
} from './action';
import {EditorState} from './type';

export type EditorStateCreator =
| typeof SetFontName
| typeof EnterEditor
| typeof LeaveEditor
| typeof OpenEditorMenu
| typeof CloseEditorMenu
| typeof ToggleEditorMenu
| typeof SetEditorMessage
| typeof ClearEditorMessage;

export type EditorStateAction = ActionType<EditorStateCreator>;

export const reducer = createReducer<EditorState, EditorStateAction>(null)
.handleAction(SetFontName, () => null)
.handleAction(EnterEditor, (state, {payload: {codePoint, element}}) => {
    if (state && state.codePoint === codePoint) {
        return state.element === element ? state : {...state, element};
    }
    return {codePoint, element};
})
.handleAction(LeaveEditor, (state, {payload: codePoint}) => {
    return state && state.codePoint === codePoint ? null : state;
})
.handleAction(OpenEditorMenu, (state, {payload: codePoint}) => {
    return state && state.codePoint === codePoint ? {...state, menu: true} : null;
})
.handleAction(CloseEditorMenu, (state, {payload: codePoint}) => {
    return state && state.codePoint === codePoint ? {...state, menu: false} : null;
})
.handleAction(ToggleEditorMenu, (state, {payload: codePoint}) => {
    return state && state.codePoint === codePoint ? {...state, menu: !state.menu} : null;
})
.handleAction(SetEditorMessage, (state, {payload: {codePoint, color, text}}) => {
    return state && state.codePoint === codePoint ? {...state, message: {color, text}} : null;
})
.handleAction(ClearEditorMessage, (state, {payload: codePoint}) => {
    return state && state.codePoint === codePoint ? {...state, message: undefined} : null;
});
