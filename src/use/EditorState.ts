import {useSelector} from 'react-redux';
import {selectEditor} from '../core/Editor/selector';
import {useMemo} from 'react';
import {EditorState} from '../core/Editor/type';

export const useEditorState = (codePoint: number): EditorState => {
    const editor = useSelector(selectEditor);
    return useMemo(
        () => editor.codePoint === codePoint && editor,
        [editor, codePoint],
    );
};
