import {EditorState} from './type';
import {createSelector} from 'reselect';
import {projectPosition} from '../util/projectPosition';

export const selectEditor = ({Editor}: {Editor: EditorState}): EditorState => Editor;
export const selectEditorCodePoint = createSelector(
    [selectEditor],
    (editor): number => editor.codePoint || 0,
);
export const selectEditorMenu = createSelector([selectEditor], ({menu}) => menu);
export const selectEditorMessage = createSelector([selectEditor], ({message}) => message);
export const selectEditorElement = createSelector([selectEditor], ({element}) => element);
export const selectFontConfig = createSelector(
    [selectEditor],
    (editor): boolean => Boolean(editor.config),
);
export const selectEditngCodePoints = createSelector([selectEditor], ({editing}) => editing);
export const selectEditorWidth = createSelector([selectEditor], ({width}) => width);
export const selectEditorHeight = createSelector([selectEditor], ({height}) => height);
export const selectEditorAxis = createSelector([selectEditor], ({axis}) => axis);
export const selectEditorBaseline = createSelector([selectEditor], ({baseline}) => baseline);
export const selectEditorGrid = createSelector([selectEditor], ({grid}) => grid);
export const selectEditorBoundingBox = createSelector([selectEditor], ({boundingBox}) => boundingBox);
export const selectEditorStyle = createSelector(
    [selectEditorWidth, selectEditorHeight],
    (width, height) => ({
        '--Width': `${width.toFixed(1)}rem`,
        '--Height': `${height.toFixed(1)}rem`,
    }),
);
export const selectEditorLoading = createSelector([selectEditor], ({loading}) => Boolean(loading));
export const selectEditorSaving = createSelector([selectEditor], ({saving}) => Boolean(saving));
export const selectEditorAdvance = createSelector([selectEditor], ({advance}) => advance);
export const selectEditorSize = createSelector([selectEditor], ({size}) => size);
export const selectEditorOrigin = createSelector([selectEditor], ({origin}) => origin);
export const selectEditorPointer = createSelector([selectEditor], ({pointer}) => pointer);
export const selectEditorDrag = createSelector([selectEditor], ({drag}) => drag);
export const selectEditorScale = createSelector([selectEditor], ({scale}) => scale);
export const selectEditorProjected = createSelector(
    [
        selectEditorSize,
        selectEditorPointer,
        selectEditorDrag,
        selectEditorScale,
        selectEditorOrigin,
    ],
    (size, pointer, drag, scale, origin) => projectPosition({size, pointer, drag, scale, origin}),
);
