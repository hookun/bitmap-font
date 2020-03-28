import {RefObject, useMemo} from 'react';
import {RGBTuple} from '@hookun/util/color';

export const getColor = (element?: HTMLElement | null): RGBTuple => {
    if (element) {
        const {color} = getComputedStyle(element);
        const [r, g, b] = color.match(/\d+/g);
        return [Number(r), Number(g), Number(b)];
    }
    return [0, 0, 0];
};

export const useColor = (ref: RefObject<HTMLElement>): RGBTuple => {
    const {current: element} = ref;
    return useMemo(() => getColor(element), [element]);
};
