type VoidFunction = () => void;

export const debounce = (
    fn: VoidFunction,
    duration: number,
): VoidFunction => {
    let timerId: ReturnType<typeof setTimeout> | undefined;
    return (): void => {
        clearTimeout(timerId);
        timerId = setTimeout(fn, duration);
    };
};
