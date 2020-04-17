import {Glyph} from '../type';

export const getColumn = (
    {pixels}: Glyph,
    columnIndex: number,
): Set<number> => {
    const column = pixels.get(columnIndex);
    return column ? new Set(column) : new Set();
};
