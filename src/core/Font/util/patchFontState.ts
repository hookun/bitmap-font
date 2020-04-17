import {clamp} from '@hookun/util/clamp';
import {FontState} from '../type';
import {nullCheck} from '../../util/nullCheck';
import {isSameObject} from '../../util/isSameObject';
import {generateNewId} from '../../util/generateFontId';

export const FontStateLimits = {
    ascent: {min: 5, max: 2000, default: 12},
    descent: {min: 0, max: 1000, default: 6},
};

export const patchFontState = (...patches: Array<Partial<FontState>>): FontState => {
    const partial = Object.assign({}, ...patches) as Partial<FontState>;
    const [first] = patches;
    const {ascent, descent} = FontStateLimits;
    const patched = {
        id: nullCheck(partial.id, generateNewId()),
        name: nullCheck(partial.name, 'MyFont'),
        ascent: clamp(nullCheck(partial.ascent, ascent.default), ascent.min, ascent.max),
        descent: clamp(nullCheck(partial.descent, descent.default), descent.min, descent.max),
    };
    return isSameObject(first, patched) ? first as FontState : patched;
};
