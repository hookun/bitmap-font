import {createElement, ReactElement} from 'react';
import {
    SetGuideCellId,
    SetGuidePathDirection,
    SetGuideGrid,
} from '../../core/Guide/action';
import {
    selectGuideCellId,
    selectGuidePathDirection,
    selectGuideGrid,
} from '../../core/Guide/selector';
import {InputBoolean} from '../InputBoolean';
import className from './style.css';

export const Control = (): ReactElement => createElement(
    'div',
    {className: className.container},
    createElement(InputBoolean, {
        label: '罫線',
        selector: selectGuideGrid,
        action: SetGuideGrid,
    }),
    createElement(InputBoolean, {
        label: 'マスの番号',
        selector: selectGuideCellId,
        action: SetGuideCellId,
    }),
    createElement(InputBoolean, {
        label: 'パスの方向',
        selector: selectGuidePathDirection,
        action: SetGuidePathDirection,
    }),
);
