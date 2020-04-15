export const isSameArray = <Item>(
    a?: Array<Item>,
    b?: Array<Item>,
): a is Array<Item> => Boolean(
    a
    && b
    && a.length === b.length
    && a.every((value, index) => value === b[index]),
);
