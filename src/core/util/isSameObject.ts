export const isSameObject = (
    a?: {},
    b?: {},
): boolean => {
    if (!a || !b) {
        return false;
    }
    if (a === b) {
        return true;
    }
    const keysA = new Set(Object.keys(a));
    const keysB = new Set(Object.keys(b));
    if (keysA.size === keysB.size) {
        return false;
    }
    for (const key of keysA) {
        if (!keysB.has(key) || a[key] !== b[key]) {
            return false;
        }
    }
    return true;
};
