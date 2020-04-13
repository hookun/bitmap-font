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
    GrabEditor,
    DragEditor,
    ReleaseEditor,
    ResetEditor,
    SetEditorPointer,
    PatchEditor,
} from './action';
import {EditorState} from './type';
import {projectPosition} from '../util/projectPosition';
import {PointerDown} from '../action';

export type EditorStateCreator =
| typeof PatchEditor
| typeof SetFontId
| typeof EnterEditor
| typeof LeaveEditor
| typeof OpenEditorMenu
| typeof CloseEditorMenu
| typeof ToggleEditorMenu
| typeof SetEditorMessage
| typeof ClearEditorMessage
| typeof OpenFontSettings
| typeof CloseFontSettings
| typeof GrabEditor
| typeof DragEditor
| typeof ReleaseEditor
| typeof ResetEditor
| typeof SetEditorPointer
| typeof PointerDown;

export type EditorStateAction = ActionType<EditorStateCreator>;

export const reducer = createReducer<EditorState, EditorStateAction>(patch())
.handleAction(SetFontId, () => patch())
.handleAction([PatchEditor, EnterEditor], (state, {payload}) => patch(state, payload))
.handleAction(OpenEditorMenu, (state, {payload: codePoint}) => patch(state, {menu: codePoint}))
.handleAction(CloseEditorMenu, (state, {payload: codePoint}) => state.menu === codePoint ? patch(state, {menu: null}) : state)
.handleAction(ToggleEditorMenu, (state, {payload: codePoint}) => patch(state, {menu: state.menu === codePoint ? null : codePoint}))
.handleAction(SetEditorMessage, (state, {payload: {codePoint, color, text}}) => patch(state, {codePoint, message: {color, text}}))
.handleAction(ClearEditorMessage, (state, {payload: codePoint}) => patch(state, {codePoint, message: null}))
.handleAction(OpenFontSettings, (state) => patch(state, {config: true}))
.handleAction(CloseFontSettings, (state) => patch(state, {config: false}))
.handleAction(GrabEditor, (state, {payload: {x, y}}) => patch(state, {pointer: [x, y], drag: [0, 0]}))
.handleAction(SetEditorPointer, (state, {payload}) => patch(state, {pointer: payload && [payload.x, payload.y]}))
.handleAction(DragEditor, (state, {payload: {dx, dy, scale}}) => patch(state, {drag: [dx, dy], scale}))
.handleAction(ReleaseEditor, (state, {payload}) => patch(
    state,
    projectPosition({...state, ...payload}),
    {drag: null, scale: 1},
))
.handleAction(PointerDown, (state) => patch(state, {menu: null}));
