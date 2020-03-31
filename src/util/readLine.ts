export const readLine = function* (source: string): Generator<string> {
    const lineBreak = /[\r\n]+/g;
    while (1) {
        const {lastIndex} = lineBreak;
        const matched = lineBreak.exec(source);
        if (matched) {
            yield source.slice(lastIndex, matched.index);
        } else {
            break;
        }
    }
};
