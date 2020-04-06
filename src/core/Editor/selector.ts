import {EditorState} from './type';
import {createSelector} from 'reselect';

export const selectEditor = ({Editor}: {Editor: EditorState}): EditorState => Editor;
export const selectEditorCodePoint = createSelector(
    [selectEditor],
    (editor): number => editor.codePoint || 0,
);
export const selectEditorMenu = createSelector(
    [selectEditor],
    (editor): boolean => Boolean(editor.menu),
);
export const selectFontConfig = createSelector(
    [selectEditor],
    (editor): boolean => Boolean(editor.config),
);
