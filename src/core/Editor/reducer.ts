import {SetFontId} from '../Font/action';
import {createReducer, ActionType} from 'typesafe-actions';
import {
    EnterEditor,
    LeaveEditor,
    OpenEditorMenu,
    CloseEditorMenu,
    ToggleEditorMenu,
    SetEditorMessage,
    ClearEditorMessage,
    OpenFontSettings,
    CloseFontSettings,
} from './action';
import {EditorState} from './type';

export type EditorStateCreator =
| typeof SetFontId
| typeof EnterEditor
| typeof LeaveEditor
| typeof OpenEditorMenu
| typeof CloseEditorMenu
| typeof ToggleEditorMenu
| typeof SetEditorMessage
| typeof ClearEditorMessage
| typeof OpenFontSettings
| typeof CloseFontSettings;

export type EditorStateAction = ActionType<EditorStateCreator>;

export const reducer = createReducer<EditorState, EditorStateAction>({})
.handleAction(SetFontId, () => ({}))
.handleAction(EnterEditor, (state, {payload: {codePoint, element}}) => {
    if (state.codePoint === codePoint) {
        return state.element === element ? state : {...state, element};
    }
    return {codePoint, element};
})
.handleAction(LeaveEditor, (state, {payload: codePoint}) => {
    return state.codePoint === codePoint ? {} : state;
})
.handleAction(OpenEditorMenu, (state, {payload: codePoint}) => {
    return state.codePoint === codePoint ? {...state, menu: true} : {};
})
.handleAction(CloseEditorMenu, (state, {payload: codePoint}) => {
    return state.codePoint === codePoint ? {...state, menu: false} : {};
})
.handleAction(ToggleEditorMenu, (state, {payload: codePoint}) => {
    return state.codePoint === codePoint ? {...state, menu: !state.menu} : {};
})
.handleAction(SetEditorMessage, (state, {payload: {codePoint, color, text}}) => {
    return state.codePoint === codePoint ? {...state, message: {color, text}} : {};
})
.handleAction(ClearEditorMessage, (state, {payload: codePoint}) => {
    if (state.codePoint === codePoint) {
        const newState = {...state};
        delete newState.message;
        return newState;
    }
    return {};
})
.handleAction(OpenFontSettings, (state) => ({...state, config: true}))
.handleAction(CloseFontSettings, (state) => {
    const newState = {...state};
    delete newState.config;
    return newState;
});
