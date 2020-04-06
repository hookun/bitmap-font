export interface GlyphKey {
    fontId: string,
    codePoint: number,
}

export interface Glyph extends GlyphKey {
    data: ArrayBuffer,
}
