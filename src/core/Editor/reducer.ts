import {createReducer, ActionType} from 'typesafe-actions';
import {SetFontId} from '../Font/action';
import {patchEditorState as patch} from './util/patchEditorState';
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

export const reducer = createReducer<EditorState, EditorStateAction>(patch())
.handleAction(SetFontId, () => patch())
.handleAction(EnterEditor, (state, {payload}) => patch(state, payload))
.handleAction(LeaveEditor, (state, {payload: codePoint}) => patch(state, {codePoint, element: null}))
.handleAction(OpenEditorMenu, (state, {payload: codePoint}) => patch(state, {codePoint, menu: true}))
.handleAction(CloseEditorMenu, (state, {payload: codePoint}) => patch(state, {codePoint, menu: false}))
.handleAction(ToggleEditorMenu, (state, {payload: codePoint}) => patch(state, {codePoint, menu: !state.menu}))
.handleAction(SetEditorMessage, (state, {payload: {codePoint, color, text}}) => patch(state, {codePoint, message: {color, text}}))
.handleAction(ClearEditorMessage, (state, {payload: codePoint}) => patch(state, {codePoint, message: null}))
.handleAction(OpenFontSettings, (state) => patch(state, {config: true}))
.handleAction(CloseFontSettings, (state) => patch(state, {config: false}));
