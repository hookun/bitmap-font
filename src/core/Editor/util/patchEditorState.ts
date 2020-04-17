import {EditorState} from '../type';
import {nullCheck} from '../../util/nullCheck';
import {isSameObject} from '../../util/isSameObject';
import {isSameArray} from '../../util/isSameArray';
import {isPrintable} from '../../../util/isPrintable';
import {clamp} from '@hookun/util/clamp';
import {generateNewId} from '../../util/generateFontId';
import {Point} from '../../type';

export const OpacityStepCount = 6;
export const EditorStateLimits = {
    width: {min: 10, max: 100, default: 14},
    height: {min: 10, max: 100, default: 16},
    advance: {min: 6, max: 1000, default: 12},
};

export const patchEditorState = (...patches: Array<Partial<EditorState>>): EditorState => {
    const partial = Object.assign({}, ...patches) as Partial<EditorState>;
    const [first] = patches;
    const size = nullCheck(partial.size, 12);
    let editing = [...new Set(partial.editing || [])].filter(isPrintable);
    if (editing.length === 0) {
        editing.push(65, 66, 67, 12354, 12356, 12358);
    }
    let origin: Point = nullCheck(partial.origin, [size * 2, size * 2]);
    let pointer: Point | null = partial.pointer;
    let drag: Point | null = partial.drag;
    if (first) {
        if (isSameArray(first.origin, origin)) {
            origin = first.origin;
        }
        if (isSameArray(first.editing, editing)) {
            editing = first.editing;
        }
        if (pointer && isSameArray(first.pointer, pointer)) {
            pointer = first.pointer;
        }
        if (drag && isSameArray(first.drag, drag)) {
            drag = first.drag;
        }
    }
    const {width, height, advance} = EditorStateLimits;
    const patched: EditorState = {
        id: nullCheck(partial.id, generateNewId()),
        codePoint: partial.codePoint || null,
        size,
        origin,
        pointer,
        drag,
        scale: 1,
        element: partial.element || null,
        message: partial.message || null,
        menu: partial.menu || null,
        config: Boolean(partial.config),
        width: clamp(nullCheck(partial.width, width.default), width.min, width.max),
        height: clamp(nullCheck(partial.height, height.default), height.min, height.max),
        advance: clamp(nullCheck(partial.advance, advance.default), advance.min, advance.max),
        editing,
        loading: partial.loading,
        saving: partial.saving,
        axis: nullCheck(partial.axis, 2) % OpacityStepCount,
        baseline: nullCheck(partial.baseline, 2) % OpacityStepCount,
        grid: nullCheck(partial.grid, 1) % OpacityStepCount,
        boundingBox: nullCheck(partial.boundingBox, 2) % OpacityStepCount,
    };
    return isSameObject(first, patched) ? first as EditorState : patched;
};
