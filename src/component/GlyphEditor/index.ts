import {createElement, ReactElement, useCallback, DragEvent, useMemo, HTMLProps} from 'react';
import {useDispatch} from 'react-redux';
import className from './style.css';
import {useUCD} from '../../use/UCD';
import {toHex} from '../../util/codePoint';
import {useEditorMessage} from '../../use/EditorMessage';
import {EnterEditor, LeaveEditor, ReplaceEditor} from '../../core/Editor/action';
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

export const GlyphMessage = ({codePoint}: {codePoint: number}): ReactElement => {
    const message = useEditorMessage(codePoint);
    if (message) {
        return createElement(
            'div',
            {
                className: className.message,
                style: {color: message.color || null},
            },
            message.text,
        );
    }
    return null;
};

export const GlyphEditor = ({codePoint}: {codePoint: number}): ReactElement => {
    const characterData = useUCD(codePoint);
    const dispatch = useDispatch();
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
            onDragStart: useCallback(({nativeEvent}: DragEvent) => {
                nativeEvent.dataTransfer.setData('text/plain', codePoint.toString(16));
            }, [codePoint]),
            onDragOver: useCallback((event: DragEvent) => {
                event.preventDefault();
            }, []),
            onDrop: useCallback(({nativeEvent}: DragEvent) => {
                const dragged = parseInt(nativeEvent.dataTransfer.getData('text/plain'), 16);
                if (0 < dragged && dragged !== codePoint) {
                    dispatch(ReplaceEditor({dragged, target: codePoint}));
                }
            }, [dispatch, codePoint]),
            draggable: true,
        },
        createElement(GlyphMessage, {codePoint}),
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
