import {useEditorState} from './EditorState';

export const useEditorStateMenu = (codePoint: number): boolean => {
    const editorState = useEditorState(codePoint);
    return Boolean(editorState && editorState.menu);
};
