import {createAction} from 'typesafe-actions';
import {EditorState} from './type';

export const PatchEditor = createAction('PatchEditor')<Partial<EditorState>>();
export const OpenEditorMenu = createAction('OpenEditorMenu')<number>();
export const CloseEditorMenu = createAction('CloseEditorMenu')<number>();
export const ToggleEditorMenu = createAction('ToggleEditorMenu')<number>();
export const EnterEditor = createAction('EnterEditor')<{
    codePoint: number,
    element: string,
}>();
export const LeaveEditor = createAction('LeaveEditor')<number>();
export const SetEditorMessage = createAction('SetEditorMessage')<{
    codePoint: number,
    text: string,
    color?: string,
    duration?: number,
}>();
export const ClearEditorMessage = createAction('ClearEditorMessage')<number>();
export const OpenFontSettings = createAction('OpenFontSettings')();
export const CloseFontSettings = createAction('CloseFontSettings')();
export const SetEditorPointer = createAction('SetEditorPointer')<null | {
    x: number,
    y: number,
}>();
export const GrabEditor = createAction('GrabEditor')<{
    x: number,
    y: number,
}>();
export const DragEditor = createAction('DragEditor')<{
    dx: number,
    dy: number,
    scale?: number,
}>();
export const ReleaseEditor = createAction('ReleaseEditor')<void | {
    x: number,
    y: number,
    scale: number,
}>();
export const ResetEditor = createAction('ResetEditor')();
