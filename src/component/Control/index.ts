import {createElement, useCallback, ReactElement} from 'react';
import {InputSize} from '../InputSize';
import {
    useDispatch,
    useSelector,
} from '../../core';
import {
    selectCellNumber,
    selectPathDirection,
    selectWidth,
    selectHeight,
    selectGrid,
} from '../../selector';
import {
    SetWidth,
    SetHeight,
    SetCellNumber,
    SetPathDirection,
    SetGrid,
} from '../../action';
import {Checkbox} from '../Checkbox';
import className from './style.css';

export const Control = (): ReactElement => {
    const dispatch = useDispatch();
    const cellNumber = useSelector(selectCellNumber);
    const pathDirection = useSelector(selectPathDirection);
    const grid = useSelector(selectGrid);
    return createElement(
        'div',
        {className: className.container},
        createElement(Checkbox, {
            checked: cellNumber,
            label: 'マスの番号',
            onChange: useCallback(
                (checked) => dispatch(SetCellNumber(checked)),
                [dispatch],
            ),
        }),
        createElement(Checkbox, {
            checked: pathDirection,
            label: 'パスの方向',
            onChange: useCallback(
                (checked) => dispatch(SetPathDirection(checked)),
                [dispatch],
            ),
        }),
        createElement(Checkbox, {
            checked: grid,
            label: '罫線',
            onChange: useCallback(
                (checked) => dispatch(SetGrid(checked)),
                [dispatch],
            ),
        }),
        createElement(InputSize, {label: '横', selector: selectWidth, action: SetWidth}),
        createElement(InputSize, {label: '縦', selector: selectHeight, action: SetHeight}),
    );
};
