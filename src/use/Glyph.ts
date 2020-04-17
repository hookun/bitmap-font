import {Glyph} from '../core/Glyph/type';
import {useSelector} from 'react-redux';
import {selectGlyphMap} from '../core/Glyph/selector';
import {EditorStateLimits} from '../core/Editor/util/patchEditorState';

const defaultGlyph: Glyph = {
    pixels: new Map(),
    advance: EditorStateLimits.advance.default,
};

export const useGlyph = (codePoint: number): Glyph => {
    const map = useSelector(selectGlyphMap);
    return map.get(codePoint) || defaultGlyph;
};
