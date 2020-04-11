import {EditorState} from '../type';
import {nullCheck} from '../../util/nullCheck';
import {isSameObject} from '../../util/isSameObject';
import {generateNewId} from '../../util/generateFontId';
import {clamp} from '../../../util/clamp';
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
    const size = nullCheck(partial.codePoint, 12);
    let origin = nullCheck(partial.origin, [size * 2, size * 2]);
    if (first && isSameArray(first.origin, origin)) {
        origin = first.origin;
    }
    const patched: EditorState = {
        codePoint: partial.codePoint || null,
        size,
        origin: nullCheck(partial.origin, [size * 2, size * 2]),
        pos: nullCheck(partial.pos, null),
        grabbing: partial.grabbing || null,
        element: partial.element || null,
        message: partial.message || null,
        menu: Boolean(partial.menu),
        config: Boolean(partial.config),
    };
    return isSameObject(first, patched) ? first as EditorState : patched;
};
