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
            characterData.Name,
        ),
        createElement(
            'div',
            {className: className.hex},
            `${toHex(codePoint)} ${String.fromCodePoint(codePoint)}`,
        ),
        createElement(GlyphEditorCanvas, {codePoint}),
        createElement(GlyphEditorMenu, {codePoint}),
    );
};
