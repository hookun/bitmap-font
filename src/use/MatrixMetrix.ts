import {useSelector} from 'react-redux';
import {selectFontAscent, selectFontDescent} from '../core/Font/selector';
import {useMemo} from 'react';

export interface MatrixMetrics {
    ascent: number,
    descent: number,
    columnCount: number,
    rowCount: number,
}

export const useMatrixMetrics = (): MatrixMetrics => {
    const ascent = useSelector(selectFontAscent);
    const descent = useSelector(selectFontDescent);
    return useMemo(
        () => ({
            ascent,
            descent,
            columnCount: 10,
            rowCount: ascent + descent,
        }),
        [ascent, descent],
    );
};
