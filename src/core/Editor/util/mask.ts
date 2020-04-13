import {EditorState} from '../type';

export const stateMask: Partial<EditorState> = {
    codePoint: null,
    menu: null,
    drag: null,
    pointer: null,
    element: null,
    message: null,
    config: false,
    scale: 1,
    loading: false,
    saving: false,
};

export const mask = (state: EditorState): Partial<EditorState> => {
    const masked = {...state};
    for (const key of Object.keys(stateMask)) {
        delete masked[key];
    }
    return masked;
};
