import {GlyphMap, Glyph} from '../type';

export const getGlyph = (
    map: GlyphMap,
    codePoint: number,
    defaultAdvance: number,
): Glyph => {
    const glyph = map.get(codePoint);
    return glyph ?
    {
        pixels: new Map(glyph.pixels),
        advance: glyph.advance,
    } : {pixels: new Map(), advance: defaultAdvance};
};
