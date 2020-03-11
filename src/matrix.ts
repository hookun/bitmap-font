import {filledArray} from './util/filledArray';

const s = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_+';
const chunkSize = 6;

export const encodeMatrix = (
    matrix: Array<boolean>,
    width: number,
    height: number,
) => {
    const data: Array<string> = [];
    for (let index = 0; index < matrix.length; index += chunkSize) {
        const bits = matrix.slice(index, index + chunkSize).reduce(
            (sum, value, index) => sum + ((value ? 1 : 0) << (chunkSize - 1 - index)),
            0,
        );
        data.push(s[bits]);
    }
    return `${width}x${height}|${data.join('')}`;
};

export const decodeMatrix = (data: string) => {
    if (!data) {
        return {matrix: filledArray(81, false), width: 9, height: 9};
    }
    const [size, body] = data.split('|');
    const [width, height] = size.split('x').map(Number);
    const matrix: Array<boolean> = [];
    for (const character of body) {
        const bits = s.indexOf(character);
        for (let shift = chunkSize; shift--;) {
            matrix.push(Boolean((bits >> shift) & 1));
        }
    }
    return {matrix: matrix.slice(0, width * height), width, height}
};
