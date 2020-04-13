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
export const selectEditngCodePoints = createSelector([selectEditor], ({editing}) => editing);
export const selectEditorWidth = createSelector([selectEditor], ({width}) => width);
export const selectEditorHeight = createSelector([selectEditor], ({height}) => height);
export const selectEditorStyle = createSelector(
    [selectEditorWidth, selectEditorHeight],
    (width, height) => ({
        '--Width': `${width.toFixed(1)}rem`,
        '--Height': `${height.toFixed(1)}rem`,
    }),
);
export const selectEditorLoading = createSelector([selectEditor], ({loading}) => Boolean(loading));
export const selectEditorSaving = createSelector([selectEditor], ({saving}) => Boolean(saving));
