import {useEffect, Reducer, useReducer} from 'react';
import {useAltKey} from './AltKey';
import {EditorMessage} from '../core/Editor/type';
import {useSelector} from 'react-redux';
import {
    selectEditorCodePoint,
    selectEditorMessage,
    selectEditorMenu,
    selectEditorElement,
} from '../core/Editor/selector';

export const messageReducer: Reducer<EditorMessage | null, EditorMessage | null> = (
    current,
    message,
) => {
    if (message) {
        if (current && current.color === message.color && current.text === message.text) {
            return current;
        }
        return message;
    }
    return null;
};

export const useEditorMessage = (codePoint: number): EditorMessage | null => {
    const editorCodePoint = useSelector(selectEditorCodePoint);
    const editorMessage = useSelector(selectEditorMessage);
    const menu = useSelector(selectEditorMenu);
    const element = useSelector(selectEditorElement);
    const altKey = useAltKey();
    const [message, setMessage] = useReducer(messageReducer, null);
    useEffect(
        (): void => {
            if (codePoint === editorCodePoint) {
                if (editorMessage) {
                    setMessage(editorMessage);
                } else if (element == 'toggle') {
                    if (altKey) {
                        setMessage({text: '閉じる'});
                    } else if (menu) {
                        setMessage({text: 'メニューを閉じる'});
                    } else {
                        setMessage({text: 'メニューを開く'});
                    }
                } else {
                    setMessage(null);
                }
            } else {
                setMessage(null);
            }
        },
        [codePoint, editorCodePoint, altKey, editorMessage, menu, element],
    );
    return message;
};
