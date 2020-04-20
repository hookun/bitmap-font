import {createReducer, ActionType} from 'typesafe-actions';
import {SetFontId} from '../Font/action';
import {patchEditorState as patch, OpacityStepCount} from './util/patchEditorState';
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
    SetEditorConfig,
    ChangeEditorAxis,
    ChangeEditorBaseline,
    ChangeEditorGrid,
    ChangeEditorBoundingBox,
    ReplaceEditor,
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
| typeof SetEditorConfig
| typeof ChangeEditorAxis
| typeof ChangeEditorBaseline
| typeof ChangeEditorGrid
| typeof ChangeEditorBoundingBox
| typeof ReplaceEditor;

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
.handleAction(
    [SagaSetEditor, SetEditorConfig, EnterEditor],
    (state, {payload}) => patch(state, payload),
)
.handleAction(LeaveEditor, (state) => state.element ? patch(state, {element: null}) : state)
.handleAction(OpenEditorMenu, (state, {payload: codePoint}) => patch(state, {menu: codePoint}))
.handleAction(CloseEditorMenu, (state) => state.menu ? patch(state, {menu: null}) : state)
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
.handleAction(ReleaseEditor, (state, {payload}) => {
    const {ox, oy, size} = projectPosition({...state, ...payload});
    return patch(
        state,
        {
            origin: [ox, oy],
            size,
            drag: null,
            scale: 1,
        },
    );
})
.handleAction(PointerDown, (state) => patch(state, {menu: null}))
.handleAction(SetEditorLoading, (state, {payload: loading}) => patch(state, {loading}))
.handleAction(SetEditorSaving, (state, {payload: saving}) => patch(state, {saving}))
.handleAction(ChangeEditorAxis, (state) => patch(state, {axis: (state.axis + 1) % OpacityStepCount}))
.handleAction(ChangeEditorBaseline, (state) => patch(state, {baseline: (state.baseline + 1) % OpacityStepCount}))
.handleAction(ChangeEditorGrid, (state) => patch(state, {grid: (state.grid + 1) % OpacityStepCount}))
.handleAction(ChangeEditorBoundingBox, (state) => patch(state, {boundingBox: (state.boundingBox + 1) % OpacityStepCount}))
.handleAction(ReplaceEditor, (state, {payload: {dragged, target}}) => {
    const editing = state.editing.slice();
    const draggedIndex = editing.indexOf(dragged);
    if (draggedIndex < 0) {
        return state;
    }
    editing.splice(draggedIndex, 1);
    let targetIndex = editing.indexOf(target);
    if (targetIndex < 0) {
        return state;
    } else if (draggedIndex <= targetIndex) {
        targetIndex += 1;
    }
    editing.splice(targetIndex, 0, dragged);
    return patch(state, {
        editing: [
            ...editing.slice(0, target),
        ],
    });
});
