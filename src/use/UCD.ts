import {loadUCD, UCDEntry} from '../util/loadUCD';
import {useEffect, useState} from 'react';

const promise = loadUCD();
const loadingUCDEntry: UCDEntry = {
    Name: 'Loading...',
    GeneralCategory: '?',
    CanonicalCombiningClass: 0,
    BidiClass: '',
    Decomposition: '',
    Numeric: '',
    BidiMirrored: false,
    UpperCase: '',
    LowerCase: '',
    TitleCase: '',
};
const notFoundUCDEntry: UCDEntry = {
    Name: 'Unknown',
    GeneralCategory: '?',
    CanonicalCombiningClass: 0,
    BidiClass: '',
    Decomposition: '',
    Numeric: '',
    BidiMirrored: false,
    UpperCase: '',
    LowerCase: '',
    TitleCase: '',
};

export const useUCD = (codePoint: number): UCDEntry => {
    const [data, setData] = useState<UCDEntry>(loadingUCDEntry);
    useEffect(() => {
        let active = true;
        promise.then(({range, map}) => {
            if (active) {
                for (const {start, end, data} of range) {
                    if (start <= codePoint && codePoint <= end) {
                        return setData(data);
                    }
                }
                setData(map.get(codePoint) || notFoundUCDEntry);
            }
        });
        return (): void => {
            active = false;
        };
    }, [codePoint]);
    return data;
};
