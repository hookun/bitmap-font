import {GlyphKey} from '../Glyph/type';

export const glyphQuery = (glyphKey: GlyphKey): [string, number] => [
    glyphKey.fontId,
    glyphKey.codePoint,
];
