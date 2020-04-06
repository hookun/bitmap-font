export const isSameArray = <Item>(
    a?: Array<Item>,
    b?: Array<Item>,
): boolean => Boolean(
    a
    && b
    && a.length === b.length
    && a.every((value, index) => value === b[index]),
);
