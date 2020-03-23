export interface GlyphKey {
    fontName: string,
    codePoint: number,
}

export interface Glyph extends GlyphKey {
    data: ArrayBuffer,
}
