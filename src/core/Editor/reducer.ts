import {createReducer, ActionType} from 'typesafe-actions';
import {SetFontId} from '../Font/action';
import {patchEditorState as patch} from './util/patchEditorState';
import {
    EnterEditor,
    OpenEditors,
    OpenEditor,
    CloseEditor,
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
    SagaSetEditor,
    SetEditorLoading,
    SetEditorSaving,
    SetEditorGrid,
} from './action';
import {EditorState} from './type';
import {projectPosition} from '../util/projectPosition';
import {PointerDown, Restart} from '../action';

export type EditorStateCreator =
| typeof Restart
| typeof SagaSetEditor
| typeof OpenEditors
| typeof OpenEditor
| typeof CloseEditor
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
| typeof PointerDown
| typeof SetEditorLoading
| typeof SetEditorSaving
| typeof SetEditorGrid;

export type EditorStateAction = ActionType<EditorStateCreator>;

export const reducer = createReducer<EditorState, EditorStateAction>(patch())
.handleAction([Restart, SetFontId], (state) => ({...state, loading: true}))
.handleAction(OpenEditors, (state, {payload: characters}) => {
    const editing = state.editing.slice();
    for (const character of characters) {
        editing.push(character.codePointAt(0));
    }
    return patch(state, {editing});
})
.handleAction(OpenEditor, (state, {payload: codePoint}) => {
    return patch(state, {editing: state.editing.concat(codePoint)});
})
.handleAction(CloseEditor, (state, {payload: codePoint}) => {
    const editing = state.editing.slice();
    const index = editing.indexOf(codePoint);
    if (index < 0) {
        return state;
    }
    editing.splice(index, 1);
    return patch(state, {editing});
})
.handleAction(SagaSetEditor, (state, {payload}) => patch(state, payload))
.handleAction(EnterEditor, (state, {payload}) => patch(state, payload))
.handleAction(OpenEditorMenu, (state, {payload: codePoint}) => patch(state, {menu: codePoint}))
.handleAction(CloseEditorMenu, (state, {payload: codePoint}) => state.menu === codePoint ? patch(state, {menu: null}) : state)
.handleAction(ToggleEditorMenu, (state, {payload: codePoint}) => patch(state, {menu: state.menu === codePoint ? null : codePoint}))
.handleAction(SetEditorMessage, (state, {payload: {codePoint, color, text}}) => patch(state, {codePoint, message: {color, text}}))
.handleAction(ClearEditorMessage, (state, {payload: codePoint}) => patch(state, {codePoint, message: null}))
.handleAction(OpenFontSettings, (state) => patch(state, {config: true}))
.handleAction(CloseFontSettings, (state) => patch(state, {config: false}))
.handleAction(GrabEditor, (state, {payload: {x, y}}) => patch(state, {pointer: [x, y], drag: [0, 0]}))
.handleAction(SetEditorPointer, (state, {payload}) => {
    if (state.drag) {
        return state;
    }
    return patch(state, {pointer: payload && [payload.x, payload.y]});
})
.handleAction(DragEditor, (state, {payload: {dx, dy, scale}}) => patch(state, {drag: [dx, dy], scale}))
.handleAction(ReleaseEditor, (state, {payload}) => patch(
    state,
    projectPosition({...state, ...payload}),
    {drag: null, scale: 1},
))
.handleAction(PointerDown, (state) => patch(state, {menu: null}))
.handleAction(SetEditorLoading, (state, {payload: loading}) => patch(state, {loading}))
.handleAction(SetEditorSaving, (state, {payload: saving}) => patch(state, {saving}))
.handleAction(SetEditorGrid, (state, {payload: grid}) => patch(state, {grid}));
