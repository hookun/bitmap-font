export const forEachAncestors = (
    element: Element | null,
    fn: (element: Element) => void | boolean,
): void => {
    while (element) {
        if (fn(element)) {
            break;
        }
        element = element.parentElement;
    }
};
