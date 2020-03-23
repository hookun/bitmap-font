import {createElement, useCallback, ReactElement} from 'react';
import {useDispatch} from 'react-redux';
import {InputSize} from '../InputSize';
import {
    useDispatch as useLocalDispatch,
    useSelector,
} from '../../old-core';
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
    SetPathDirection,
    SetGrid,
} from '../../action';
import {Checkbox} from '../Checkbox';
import {SetGuideCellId} from '../../core/Guide/action';
import className from './style.css';

export const Control = (): ReactElement => {
    const dispatch = useDispatch();
    const localDispatch = useLocalDispatch();
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
                (checked) => dispatch(SetGuideCellId(!checked)),
                [dispatch],
            ),
        }),
        createElement(Checkbox, {
            checked: pathDirection,
            label: 'パスの方向',
            onChange: useCallback(
                (checked) => localDispatch(SetPathDirection(checked)),
                [localDispatch],
            ),
        }),
        createElement(Checkbox, {
            checked: grid,
            label: '罫線',
            onChange: useCallback(
                (checked) => localDispatch(SetGrid(checked)),
                [localDispatch],
            ),
        }),
        createElement(InputSize, {label: '横', selector: selectWidth, action: SetWidth}),
        createElement(InputSize, {label: '縦', selector: selectHeight, action: SetHeight}),
    );
};
