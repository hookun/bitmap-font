import {MaxCodePoint} from '../constants';

const cache = new Map<number, boolean>();
const ranges = [
    [0x0021, 0x007E],
    [0x00A1, 0x00AC],
    [0x00AE, 0x034E],
    [0x0350, 0x05A1],
    [0x05A3, 0x05B9],
    [0x05BB, 0x05C4],
    [0x0651, 0x0DFF],
    [0x0F38, 0x17B3],
    [0x17B6, 0x180A],
    [0x1810, 0x1819],
    [0x1820, 0x1877],
    [0x1880, 0x18AA],
    [0x18B0, 0x1FFF],
    [0x2010, 0x2027],
    [0x2030, 0x205E],
    [0x2070, 0x27FF],
    [0x2801, 0x2FFF],
    [0x3001, 0x3163],
    [0x3165, 0xA48C],
    [0xA490, 0xD7A3],
];

export const isPrintable = (codePoint: number): boolean => {
    if (MaxCodePoint < codePoint) {
        return false;
    }
    if (ranges.some(([min, max]) => min <= codePoint && codePoint <= max)) {
        return true;
    }
    let paintable = cache.get(codePoint);
    if (typeof paintable === 'undefined') {
        const canvas = document.createElement('canvas');
        const size = 4;
        canvas.width = canvas.height = size;
        const ctx = canvas.getContext('2d');
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = 'rgb(255,255,255)';
        ctx.fillText(String.fromCodePoint(codePoint), size / 2, size / 2);
        paintable = ctx.getImageData(0, 0, size, size).data.some((x) => 0 < x);
        cache.set(codePoint, paintable);
    }
    return paintable;
};
