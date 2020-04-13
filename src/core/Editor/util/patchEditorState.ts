import {EditorState} from '../type';
import {nullCheck} from '../../util/nullCheck';
import {isSameObject} from '../../util/isSameObject';
import {isSameArray} from '../../util/isSameArray';

export const EditorStateLimits = {
    ascent: {min: 5, max: 2000, default: 9},
    descent: {min: 0, max: 1000, default: 10},
    width: {min: 10, max: 100, default: 14},
    height: {min: 10, max: 100, default: 16},
};

export const patchEditorState = (...patches: Array<Partial<EditorState>>): EditorState => {
    const partial = Object.assign({}, ...patches) as Partial<EditorState>;
    const [first] = patches;
    const size = nullCheck(partial.size, 12);
    let origin = nullCheck(partial.origin, [size * 2, size * 2]);
    if (first && isSameArray(first.origin, origin)) {
        origin = first.origin;
    }
    const patched: EditorState = {
        codePoint: partial.codePoint || null,
        size,
        origin: nullCheck(partial.origin, [size * 2, size * 2]),
        pointer: nullCheck(partial.pointer, null),
        drag: partial.drag || null,
        scale: 1,
        element: partial.element || null,
        message: partial.message || null,
        menu: partial.menu || null,
        config: Boolean(partial.config),
    };
    return isSameObject(first, patched) ? first as EditorState : patched;
};
