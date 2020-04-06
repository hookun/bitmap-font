import {createElement, ReactElement, useRef, useCallback} from 'react';
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
import {classnames} from '../../util/classnames';
import {useSelector, useDispatch} from 'react-redux';
import {selectFont} from '../../core/Font/selector';
import {OpenFontSettings} from '../../core/Editor/action';
import className from './style.css';

export const Control = (): ReactElement => {
    const ref = useRef();
    const intersection = useIntersection(ref, {threshold: 1});
    const dispatch = useDispatch();
    const font = useSelector(selectFont);
    const openConfig = useCallback(
        () => dispatch(OpenFontSettings()),
        [dispatch],
    );
    return createElement(
        'div',
        {
            ref,
            className: classnames(
                className.container,
                intersection < 1 && className.stuck,
            ),
        },
        createElement('div', {className: className.spacer}),
        ...[
            ['フォント名', font.name],
            ['上端', font.ascent],
            ['下端', font.descent],
        ].map(([label, value]) => createElement(
            'button',
            {
                className: className.labeled,
                onClick: openConfig,
                'data-type': typeof value,
            },
            createElement('div', {className: className.label}, label),
            `${value}`,
        )),
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
        createElement('div', {className: className.spacer}),
    );
};
