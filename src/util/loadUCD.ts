import UnicodeData from 'https://www.unicode.org/Public/UCD/latest/ucd/UnicodeData.txt';
import {readStream} from './readStream';
import {readLine} from './readLine';

export interface UCDEntry {
    Name: string,
    GeneralCategory: string,
    CanonicalCombiningClass: number,
    BidiClass: string,
    Decomposition: string,
    Numeric: string,
    BidiMirrored: boolean,
    UpperCase: string,
    LowerCase: string,
    TitleCase: string,
}

export interface UCDRangeEntry {
    start: number,
    end: number,
    data: UCDEntry,
}

export interface LoadUCDResult {
    map: Map<number, UCDEntry>,
    range: Set<UCDRangeEntry>,
}

export const splitUCDLine = function* (line: string): Generator<string, string> {
    const lineBreak = /;/g;
    while (1) {
        const {lastIndex} = lineBreak;
        const matched = lineBreak.exec(line);
        if (matched) {
            yield line.slice(lastIndex, matched.index);
        } else {
            break;
        }
    }
    return '';
};

export const loadUCD = async (): Promise<LoadUCDResult> => {
    const UTF8Decoder = new TextDecoder('utf-8');
    const range = new Set<UCDRangeEntry>();
    const map = new Map<number, UCDEntry>();
    const openedRange = new Map<string, number>();
    const response = await fetch(UnicodeData);
    for await (const chunk of readStream(response.body)) {
        for (const line of readLine(UTF8Decoder.decode(chunk))) {
            const splitter = splitUCDLine(line);
            const next = (skip = 0): string => {
                while (0 < skip--) {
                    splitter.next();
                }
                return splitter.next().value;
            };
            const codePoint = parseInt(next(), 16);
            let Name = next();
            const isRange = /,\s*(First|Last)\s*>/.test(Name);
            if (isRange) {
                const [rangeName, side] = Name.slice(1, -1).split(/\s*,\s*/);
                if (side === 'First') {
                    openedRange.set(rangeName, codePoint);
                    Name = '';
                } else {
                    Name = rangeName;
                }
            }
            if (Name) {
                const data: UCDEntry = {
                    Name,
                    GeneralCategory: next(),
                    CanonicalCombiningClass: Number(next()),
                    BidiClass: next(),
                    Decomposition: next(),
                    Numeric: next(),
                    BidiMirrored: next() === 'Y',
                    UpperCase: next(2),
                    LowerCase: next(),
                    TitleCase: next(),
                };
                if (isRange) {
                    range.add({
                        start: openedRange.get(Name),
                        end: codePoint,
                        data,
                    });
                    openedRange.delete(Name);
                } else {
                    map.set(codePoint, data);
                }
            }
        }
    }
    if (0 < openedRange.size) {
        const list = [...openedRange].map(([name, start]) => `${name} (${start.toString(16)})`);
        throw new Error(`UnclosedRanges: ${list.join(', ')}`);
    }
    return {map, range};
};
