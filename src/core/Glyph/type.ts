export interface Glyph {
    advance: number,
    pixels: Map<number, Set<number>>,
}

export type GlyphMap = Map<number, Glyph>;

export interface GlyphEntry {
    id: string,
    codePoint: number,
    glyph: Glyph,
}
