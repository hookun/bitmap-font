import {useMemo} from 'react';
import {useAltKey} from './AltKey';
import {useEditorState} from './EditorState';
import {EditorMessage} from '../core/Editor/type';

export const useEditorMessage = (codePoint: number): EditorMessage | null => {
    const editor = useEditorState(codePoint);
    const altKey = useAltKey();
    return useMemo(
        () => {
            if (editor) {
                if (editor.message) {
                    return editor.message;
                }
                const {element, menu} = editor;
                if (element == 'toggle') {
                    if (altKey) {
                        return {text: '閉じる'};
                    } else if (!menu) {
                        return {text: 'メニューを開く'};
                    }
                }
            }
            return null;
        },
        [editor, altKey],
    );
};
