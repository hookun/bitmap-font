import {createElement, MouseEvent} from 'react';
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
    ClearMatrix,
    SetCellNumber,
    SetPathDirection,
    SetGrid,
} from '../../action';
import {Checkbox} from '../Checkbox';
import className from './style.css';

export const Control = () => {
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
            onChange: (checked) => dispatch(SetCellNumber(checked)),
        }),
        createElement(Checkbox, {
            checked: pathDirection,
            label: 'パスの方向',
            onChange: (checked) => dispatch(SetPathDirection(checked)),
        }),
        createElement(Checkbox, {
            checked: grid,
            label: '罫線',
            onChange: (checked) => dispatch(SetGrid(checked)),
        }),
        createElement(InputSize, {label: '横', selector: selectWidth, action: SetWidth}),
        createElement(InputSize, {label: '縦', selector: selectHeight, action: SetHeight}),
    );
};
