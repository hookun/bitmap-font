import {createAction} from 'typesafe-actions';

export const OpenEditorMenu = createAction('OpenEditorMenu')<number>();
export const CloseEditorMenu = createAction('CloseEditorMenu')<number>();
export const ToggleEditorMenu = createAction('ToggleEditorMenu')<number>();
export const EnterEditor = createAction('EnterEditor')<{
    codePoint: number,
    element: string,
}>();
export const LeaveEditor = createAction('LeaveEditor')<number>();
