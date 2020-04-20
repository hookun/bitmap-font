import {
    createElement,
    ReactElement,
    useRef,
    useCallback,
} from 'react';
import {classnames} from '@hookun/util/classnames';
import {useIntersection} from '../../use/Intersection';
import {useSelector, useDispatch} from 'react-redux';
import {selectFont} from '../../core/Font/selector';
import {
    OpenFontSettings,
    ChangeEditorGrid,
    ChangeEditorBoundingBox,
    ChangeEditorAxis,
    ChangeEditorBaseline,
} from '../../core/Editor/action';
import {
    selectEditorWidth,
    selectEditorHeight,
    selectEditorAxis,
    selectEditorBaseline,
    selectEditorGrid,
    selectEditorBoundingBox,
} from '../../core/Editor/selector';
import className from './style.css';

export const Control = (): ReactElement => {
    const ref = useRef();
    const intersection = useIntersection(ref, {threshold: 1});
    const dispatch = useDispatch();
    const font = useSelector(selectFont);
    const width = useSelector(selectEditorWidth);
    const height = useSelector(selectEditorHeight);
    const axis = useSelector(selectEditorAxis);
    const baseline = useSelector(selectEditorBaseline);
    const grid = useSelector(selectEditorGrid);
    const boundingBox = useSelector(selectEditorBoundingBox);
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
        ...[
            ['フォント名', font.name],
            ['上端', font.ascent],
            ['下端', font.descent],
            ['幅', width],
            ['高さ', height],
        ].map(([label, value]) => createElement(
            'button',
            {
                className: className.labeled,
                onClick: openConfig,
            },
            createElement('div', {className: className.label}, label),
            `${value}`,
        )),
        createElement(
            'button',
            {
                className: className.labeled,
                onClick: useCallback(() => dispatch(ChangeEditorAxis()), [dispatch]),
            },
            createElement('div', {className: className.label}, '軸'),
            `${axis}`,
        ),
        createElement(
            'button',
            {
                className: className.labeled,
                onClick: useCallback(() => dispatch(ChangeEditorBaseline()), [dispatch]),
            },
            createElement('div', {className: className.label}, '基準線'),
            `${baseline}`,
        ),
        createElement(
            'button',
            {
                className: className.labeled,
                onClick: useCallback(() => dispatch(ChangeEditorGrid()), [dispatch]),
            },
            createElement('div', {className: className.label}, '罫線'),
            `${grid}`,
        ),
        createElement(
            'button',
            {
                className: className.labeled,
                onClick: useCallback(() => dispatch(ChangeEditorBoundingBox()), [dispatch]),
            },
            createElement('div', {className: className.label}, '囲み枠'),
            `${boundingBox}`,
        ),
    );
};
