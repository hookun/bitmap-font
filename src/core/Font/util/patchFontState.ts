import {clamp} from '@hookun/util/clamp';
import {FontState} from '../type';
import {nullCheck} from '../../util/nullCheck';
import {isSameObject} from '../../util/isSameObject';
import {isSameArray} from '../../util/isSameArray';
import {isPrintable} from '../../../util/isPrintable';
import {generateNewId} from '../../util/generateFontId';

export const FontStateLimits = {
    ascent: {min: 5, max: 2000, default: 9},
    descent: {min: 0, max: 1000, default: 10},
    width: {min: 10, max: 100, default: 14},
    height: {min: 10, max: 100, default: 16},
};

export const patchFontState = (...patches: Array<Partial<FontState>>): FontState => {
    const partial = Object.assign({}, ...patches) as Partial<FontState>;
    let editing = [...new Set(partial.editing || [])].filter(isPrintable);
    if (editing.length === 0) {
        editing.push(65, 66, 67, 12354, 12356, 12358);
    }
    const [first] = patches;
    if (first) {
        const {editing: oldEditing} = first;
        if (isSameArray(oldEditing, editing)) {
            editing = oldEditing;
        }
    }
    const {ascent, descent, width, height} = FontStateLimits;
    const patched = {
        id: nullCheck(partial.id, generateNewId()),
        name: nullCheck(partial.name, 'MyFont'),
        ascent: clamp(nullCheck(partial.ascent, ascent.default), ascent.min, ascent.max),
        descent: clamp(nullCheck(partial.descent, descent.default), descent.min, descent.max),
        width: clamp(nullCheck(partial.width, width.default), width.min, width.max),
        height: clamp(nullCheck(partial.height, height.default), height.min, height.max),
        editing,
    };
    return isSameObject(first, patched) ? first as FontState : patched;
};
