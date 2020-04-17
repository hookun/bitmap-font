import {createElement, ReactElement, useCallback} from 'react';
import {useDispatch} from 'react-redux';
import className from './style.css';
import {useUCD} from '../../use/UCD';
import {toHex} from '../../util/codePoint';
import {useEditorMessage} from '../../use/EditorMessage';
import {EnterEditor, LeaveEditor} from '../../core/Editor/action';
import {GlyphEditorMenu} from '../GlyphEditorMenu';
import {Character} from './character';
import {GlyphEditorCanvas} from '../GlyphEditorCanvas';
import {IncrementAdvance, DecrementAdvance} from '../../core/Glyph/action';
import {useGlyph} from '../../use/Glyph';

export const GlyphControl = ({codePoint}: {codePoint: number}): ReactElement => {
    const dispatch = useDispatch();
    const glyph = useGlyph(codePoint);
    return createElement(
        'div',
        {className: className.data},
        createElement(
            'svg',
            {
                className: className.icon,
                viewBox: '-1 -1 12 12',
                onClick: useCallback(() => dispatch(DecrementAdvance()), [dispatch]),
            },
            createElement('path', {d: 'M0 5H10'}),
        ),
        createElement('div', {className: className.advance}, `${glyph.advance}`),
        createElement(
            'svg',
            {
                className: className.icon,
                viewBox: '-1 -1 12 12',
                onClick: useCallback(() => dispatch(IncrementAdvance()), [dispatch]),
            },
            createElement('path', {d: 'M0 5H10M5 0V10'}),
        ),
    );
};

export const GlyphEditor = ({codePoint}: {codePoint: number}): ReactElement => {
    const dispatch = useDispatch();
    const characterData = useUCD(codePoint);
    const message = useEditorMessage(codePoint);
    const onEnter = useCallback(
        () => dispatch(EnterEditor({codePoint, element: 'root'})),
        [dispatch, codePoint],
    );
    const onLeave = useCallback(
        () => dispatch(LeaveEditor(codePoint)),
        [dispatch, codePoint],
    );
    return createElement(
        'div',
        {
            className: className.container,
            onMouseEnter: onEnter,
            onMouseLeave: onLeave,
            onTouchStart: onEnter,
        },
        message && createElement(
            'div',
            {
                className: className.message,
                style: {color: message.color || null},
            },
            message.text,
        ),
        createElement(Character, {codePoint}),
        createElement(
            'div',
            {className: className.name},
            `${toHex(codePoint)} ${characterData.Name}`,
        ),
        createElement(GlyphControl, {codePoint}),
        createElement(GlyphEditorCanvas, {codePoint}),
        createElement(GlyphEditorMenu, {codePoint}),
    );
};
