import {useMemo} from 'react';
import {useAltKey} from './AltKey';
import {useEditorState} from './EditorState';

export const useEditorMessage = (codePoint: number): string => {
    const editor = useEditorState(codePoint);
    const altKey = useAltKey();
    return useMemo(
        () => {
            if (editor) {
                const {element, menu} = editor;
                if (element == 'toggle') {
                    if (altKey) {
                        return '閉じる';
                    } else if (!menu) {
                        return 'メニューを開く';
                    }
                }
            }
            return '';
        },
        [editor, altKey],
    );
};
