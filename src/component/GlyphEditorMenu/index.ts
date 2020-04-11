import {createElement, ReactElement, useCallback, MouseEvent} from 'react';
import {useDispatch} from 'react-redux';
import {classnames} from '@hookun/util/classnames';
import {CloseEditor} from '../../core/Font/action';
import {SetEditorMessage, CloseEditorMenu} from '../../core/Editor/action';
import {useEditorStateMenu} from '../../use/EditorStateMenu';
import className from './style.css';

export const GlyphEditorMenu = ({codePoint}: {codePoint: number}): ReactElement => {
    const dispatch = useDispatch();
    const opened = useEditorStateMenu(codePoint);
    const character = String.fromCodePoint(codePoint);
    const onTouch = useCallback((event: MouseEvent) => event.stopPropagation(), []);
    return createElement(
        'div',
        {
            className: classnames(
                className.menu,
                opened && className.opened,
            ),
            onMouseDown: onTouch,
            onTouchStart: onTouch,
            onMouseLeave: useCallback(
                () => dispatch(CloseEditorMenu(codePoint)),
                [dispatch, codePoint],
            ),
        },
        createElement(
            'button',
            {
                onClick: useCallback(
                    (event: MouseEvent<HTMLButtonElement>) => {
                        const selection = document.getSelection();
                        const range = new Range();
                        range.selectNodeContents(event.currentTarget.lastElementChild);
                        selection.removeAllRanges();
                        selection.addRange(range);
                        document.execCommand('copy');
                        dispatch(SetEditorMessage({
                            codePoint,
                            text: 'コピーしました！',
                            color: 'var(--Succeed)',
                            duration: 2000,
                        }));
                        selection.removeAllRanges();
                        event.currentTarget.focus();
                    },
                    [dispatch, codePoint],
                ),
            },
            '文字をコピー：',
            createElement('div', null, character),
        ),
        createElement(
            'a',
            {
                target: '_blank',
                href: `https://www.google.com/search?${new URLSearchParams([['q', character]])}`,
            },
            'Googleで検索',
        ),
        createElement(
            'button',
            {
                onClick: useCallback(
                    () => dispatch(CloseEditor(codePoint)),
                    [dispatch, codePoint],
                ),
            },
            '閉じる',
        ),
    );
};
