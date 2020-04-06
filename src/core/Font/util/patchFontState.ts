import {FontState} from '../type';
import {nullCheck} from '../../util/nullCheck';
import {isSameObject} from '../../util/isSameObject';
import {isSameArray} from '../../util/isSameArray';
import {isPrintable} from '../../../util/isPrintable';
import {generateNewId} from '../../util/generateFontId';

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
    const patched = {
        id: nullCheck(partial.id, generateNewId()),
        name: nullCheck(partial.name, 'MyFont'),
        ascent: nullCheck(partial.ascent, 9),
        descent: nullCheck(partial.descent, 0),
        editing,
    };
    return isSameObject(first, patched) ? first as FontState : patched;
};
