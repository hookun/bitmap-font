export const nullCheck = <Type>(
    input: Type | null | undefined,
    fallback: Type,
): Type => {
    if (input === undefined || input === null) {
        return fallback;
    }
    return input;
};
