import {createElement, MouseEvent, ReactElement, useCallback} from 'react';
import {classnames} from '../../util/classnames';
import {filledArray} from '../../util/filledArray';
import {
    useSelector,
    useDispatch,
} from '../../old-core';
import {
    selectWidth,
    selectHeight,
    selectArrowSize,
    selectMatrix,
    selectPathD,
    selectCellNumber,
    selectGrid,
} from '../../selector';
import {SetCell} from '../../action';
import {PathView} from '../PathView';
import className from './style.css';

export const Matrix = (): ReactElement => {
    const width = useSelector(selectWidth);
    const height = useSelector(selectHeight);
    const arrowSize = useSelector(selectArrowSize);
    const matrix = useSelector(selectMatrix);
    const d = useSelector(selectPathD);
    const cellNumber = useSelector(selectCellNumber);
    const grid = useSelector(selectGrid);
    const dispatch = useDispatch();
    const onClick = useCallback(
        (event: MouseEvent<HTMLButtonElement>) => {
            const button = event.currentTarget;
            const index = Number(button.getAttribute('data-index'));
            const value = button.value === '1';
            dispatch(SetCell(index, !value));
        },
        [dispatch],
    );
    return createElement(
        'div',
        {
            className: className.container,
            style: {
                '--Size': `calc((var(--Width) - ${width + 1}px) / (${width + arrowSize * 2}))`,
                '--Padding': `calc(var(--Size)*${arrowSize})`,
                '--MatrixWidth': `calc(var(--Size)*${width} + ${width + 1}px + var(--Padding)*2)`,
            },
        },
        createElement(
            'div',
            {
                className: classnames(
                    className.table,
                    cellNumber && className.cellNumber,
                    grid && className.grid,
                ),
                style: {
                    gridTemplateColumns: filledArray(width, 'var(--Size)').join(' '),
                    gridTemplateRows: filledArray(height, 'var(--Size)').join(' '),
                    padding: 'var(--Padding)',
                    margin: 'calc(-1 * var(--Padding)) auto',
                },
            },
            ...matrix.map((value, index) => createElement(
                'button',
                {
                    'data-index': index,
                    value: value ? 1 : 0,
                    className: classnames(className.cell, value && className.filled),
                    onClick,
                }
            )),
        ),
        d && createElement(PathView),
    );
};
