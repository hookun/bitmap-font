import {useEffect, useState, RefObject, useMemo} from 'react';
import {debounce} from '@hookun/util/debounce';

export interface RectSize<Element extends HTMLElement = HTMLElement> {
    element: Element,
    width: number,
    height: number,
}

export const getRectSize = <Element extends HTMLElement>(ref: RefObject<Element>): RectSize<Element> => {
    const element = ref.current;
    let width = 0;
    let height = 0;
    if (element) {
        const rect = element.getBoundingClientRect();
        width = rect.width;
        height = rect.height;
    }
    return {element, width, height};
};

export const isSameRectSize = (a: RectSize, b: RectSize): boolean => {
    return a.width === b.width && a.height === b.height;
};

export const useRectSize = (
    ref: RefObject<HTMLElement>,
    debounceDuration = 500,
): RectSize => {
    const [rectSize, setRectSize] = useState<RectSize>(getRectSize(ref));
    const onResize = useMemo(
        () => debounce(
            () => {
                const currentRectSize = getRectSize(ref);
                if (!isSameRectSize(rectSize, currentRectSize)) {
                    setRectSize(currentRectSize);
                }
            },
            debounceDuration,
        ),
        [rectSize, ref, debounceDuration],
    );
    useEffect(() => {
        onResize();
        addEventListener('resize', onResize);
        return (): void => {
            onResize.cancel();
            removeEventListener('resize', onResize);
        };
    }, [onResize]);
    return rectSize;
};
