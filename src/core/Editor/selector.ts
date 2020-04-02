import {EditorState} from './type';
import {createSelector} from 'reselect';

export const selectEditor = ({Editor}: {Editor: EditorState}): EditorState => Editor;
export const selectEditorCodePoint = createSelector(
    [selectEditor],
    (editor): number => editor ? editor.codePoint : 0,
);
export const selectEditorMessage = createSelector(
    [selectEditor],
    (editor): string => editor && editor.message || '',
);
export const selectEditorMenu = createSelector(
    [selectEditor],
    (editor): boolean => Boolean(editor && editor.menu),
);
