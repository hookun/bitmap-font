import {createElement, ReactElement, useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {CloseEditor} from '../../core/Font/action';
import className from './style.css';
import {useUCD} from '../../use/UCD';
import {toHex} from '../../util/codePoint';

export const CloseButton = (): ReactElement => createElement(
    'svg',
    {
        className: className.close,
        viewBox: '-3 -3 16 16',
        title: '閉じる',
    },
    createElement('path', {d: 'M0 0L10 10M0 10L10 0'}),
);

export const GlyphEditor = ({codePoint}: {codePoint: number}): ReactElement => {
    const dispatch = useDispatch();
    const characterData = useUCD(codePoint);
    return createElement(
        'div',
        {className: className.container},
        createElement(
            'button',
            {
                className: className.character,
                title: '閉じる',
                onClick: useCallback(
                    ()=> dispatch(CloseEditor(codePoint)),
                    [dispatch, codePoint],
                ),
            },
            String.fromCodePoint(codePoint),
            createElement(CloseButton, {codePoint}),
        ),
        createElement(
            'div',
            {className: className.name},
            characterData.Name,
        ),
        createElement(
            'div',
            {className: className.hex},
            toHex(codePoint),
        ),
        createElement(
            'div',
            {className: className.editor},
        ),
    );
};
