import {
    createElement,
    ReactElement,
    useRef,
    useCallback,
} from 'react';
import {classnames} from '@hookun/util/classnames';
import {InputBoolean} from '../InputBoolean';
import {useIntersection} from '../../use/Intersection';
import {useSelector, useDispatch} from 'react-redux';
import {selectFont} from '../../core/Font/selector';
import {OpenFontSettings, SetEditorGrid} from '../../core/Editor/action';
import {selectEditor, selectEditorGrid} from '../../core/Editor/selector';
import className from './style.css';

export const Control = (): ReactElement => {
    const ref = useRef();
    const intersection = useIntersection(ref, {threshold: 1});
    const dispatch = useDispatch();
    const font = useSelector(selectFont);
    const editor = useSelector(selectEditor);
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
            ['幅', editor.width],
            ['高さ', editor.height],
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
            selector: selectEditorGrid,
            action: SetEditorGrid,
        }),
        createElement('div', {className: className.spacer}),
    );
};
