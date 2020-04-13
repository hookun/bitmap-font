import {EditorState} from '../type';
import {nullCheck} from '../../util/nullCheck';
import {isSameObject} from '../../util/isSameObject';
import {isSameArray} from '../../util/isSameArray';
import {isPrintable} from '../../../util/isPrintable';
import {clamp} from '@hookun/util/clamp';
import {generateNewId} from '../../util/generateFontId';

export const EditorStateLimits = {
    width: {min: 10, max: 100, default: 14},
    height: {min: 10, max: 100, default: 16},
};

export const patchEditorState = (...patches: Array<Partial<EditorState>>): EditorState => {
    const partial = Object.assign({}, ...patches) as Partial<EditorState>;
    const [first] = patches;
    const size = nullCheck(partial.size, 12);
    let editing = [...new Set(partial.editing || [])].filter(isPrintable);
    if (editing.length === 0) {
        editing.push(65, 66, 67, 12354, 12356, 12358);
    }
    let origin = nullCheck(partial.origin, [size * 2, size * 2]);
    if (first) {
        if (isSameArray(first.origin, origin)) {
            origin = first.origin;
        }
        if (isSameArray(first.editing, editing)) {
            editing = first.editing;
        }
    }
    const {width, height} = EditorStateLimits;
    const patched: EditorState = {
        id: nullCheck(partial.id, generateNewId()),
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
        width: clamp(nullCheck(partial.width, width.default), width.min, width.max),
        height: clamp(nullCheck(partial.height, height.default), height.min, height.max),
        editing,
        loading: partial.loading,
        saving: partial.saving,
    };
    return isSameObject(first, patched) ? first as EditorState : patched;
};
