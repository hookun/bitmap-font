import {FontState} from '../type';
import {nullCheck} from '../../util/nullCheck';

export const patchFontState = (...patches: Array<Partial<FontState>>): FontState => {
    const partial = Object.assign({}, ...patches) as Partial<FontState>;
    const editing = partial.editing ? [...new Set(partial.editing)] : [];
    if (editing.length === 0) {
        editing.push(65, 66, 67, 12354, 12356, 12358);
    }
    return {
        fontName: nullCheck(partial.fontName, 'MyFont'),
        ascent: nullCheck(partial.ascent, 9),
        descent: nullCheck(partial.descent, 9),
        editing,
    };
};
