import {Glyph} from '../core/Glyph/type';
import {useMemo} from 'react';

export interface BoundingBox {
    x: number,
    y: number,
    width: number,
    height: number,
}

export const useBoundingBox = (glyph: Glyph | null): BoundingBox => {
    const pixels = glyph ? glyph.pixels : null;
    const [xMin, xMax, yMin, yMax] = useMemo(() => {
        if (!pixels) {
            return [0, 0, 0, 0];
        }
        let xMin = Infinity;
        let xMax = -Infinity;
        let yMin = Infinity;
        let yMax = -Infinity;
        for (const [x, column] of pixels) {
            if (0 < column.size) {
                if (x < xMin) {
                    xMin = x;
                }
                if (xMax < x) {
                    xMax = x;
                }
                for (const y of column) {
                    if (y < yMin) {
                        yMin = y;
                    }
                    if (yMax < y) {
                        yMax = y;
                    }
                }
            }
        }
        return [xMin, xMax, yMin, yMax];
    }, [pixels]);
    return useMemo(() => ({
        x: xMin,
        y: yMin,
        width: xMax - xMin + 1,
        height: yMax - yMin + 1,
    }), [xMin, xMax, yMin, yMax]);
};
