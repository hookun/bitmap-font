import {createElement, ReactElement, useRef} from 'react';
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
import {useIntersection} from '../../use/Intersection';
import className from './style.css';
import {classnames} from '../../util/classnames';

export const Control = (): ReactElement => {
    const ref = useRef();
    const intersection = useIntersection(ref, {threshold: 1});
    return createElement(
        'div',
        {
            ref,
            className: classnames(
                className.container,
                intersection < 1 && className.stuck,
            ),
        },
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
};
