import {useCallback, useEffect, RefObject, useMemo, useState} from 'react';

export const useIntersection = (
    ref: RefObject<HTMLElement>,
    options?: IntersectionObserverInit,
): number => {
    const [intersectionRatio, setIntersectionRatio] = useState(1);
    const callback = useCallback<IntersectionObserverCallback>((entries) => {
        setIntersectionRatio(entries[0].intersectionRatio);
    }, []);
    const observer = useMemo<IntersectionObserver>(
        () => new IntersectionObserver(callback, options),
        [callback, options],
    );
    useEffect(() => {
        const {current: element} = ref;
        if (element) {
            observer.observe(element);
        }
        return (): void => observer.disconnect();
    }, [ref, observer]);
    return intersectionRatio;
};
