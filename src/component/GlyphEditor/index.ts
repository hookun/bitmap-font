import {createElement, ReactElement, useCallback, Fragment, MouseEvent, useRef} from 'react';
import {useDispatch} from 'react-redux';
import {CloseEditor} from '../../core/Font/action';
import className from './style.css';
import {useUCD} from '../../use/UCD';
import {toHex} from '../../util/codePoint';
import {classnames} from '../../util/classnames';
import {useEditorMessage} from '../../use/EditorMessage';
import {EnterEditor, LeaveEditor, ToggleEditorMenu, SetEditorMessage} from '../../core/Editor/action';
import {useAltKey} from '../../use/AltKey';
import {useEditorState} from '../../use/EditorState';
import {useEditorStateMenu} from '../../use/EditorStateMenu';

export const Character = ({codePoint}: {codePoint: number}): ReactElement => {
    const dispatch = useDispatch();
    const altKey = useAltKey();
    const onEnter = useCallback(
        () => dispatch(EnterEditor({codePoint, element: 'toggle'})),
        [dispatch, codePoint],
    );
    const onLeave = useCallback(
        () => dispatch(EnterEditor({codePoint, element: 'root'})),
        [dispatch, codePoint],
    );
    const opened = useEditorStateMenu(codePoint);
    const character = String.fromCodePoint(codePoint);
    return createElement(
        'button',
        {
            className: classnames(
                className.character,
                opened ? className.opened : (altKey && className.alt),
            ),
            onMouseEnter: onEnter,
            onMouseLeave: onLeave,
            onTouchStart: onEnter,
            onClick: useCallback(
                () => {
                    if (altKey) {
                        dispatch(CloseEditor(codePoint));
                    } else {
                        dispatch(ToggleEditorMenu(codePoint));
                    }
                },
                [dispatch, codePoint, altKey],
            ),
        },
        altKey ? createElement(
            'svg',
            {
                viewBox: '-3 -3 16 16',
                title: '閉じる',
            },
            createElement('path', {d: 'M0 0L10 10M0 10L10 0'}),
        ) : createElement(
            Fragment,
            null,
            character,
            createElement('div', {'data-character': character}),
        ),
    );
};

export const GlyphEditorMenu = ({codePoint}: {codePoint: number}): ReactElement => {
    const dispatch = useDispatch();
    const opened = useEditorStateMenu(codePoint);
    const character = String.fromCodePoint(codePoint);
    return createElement(
        'div',
        {
            className: classnames(
                className.menu,
                opened && className.opened,
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
            'クリップボードにコピー：',
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

export const GlyphEditor = ({codePoint}: {codePoint: number}): ReactElement => {
    const dispatch = useDispatch();
    const characterData = useUCD(codePoint);
    const editorState = useEditorState(codePoint);
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
            className: classnames(
                className.container,
                editorState && className.focused,
            ),
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
        createElement(
            'div',
            {className: className.editor},
        ),
        createElement(GlyphEditorMenu, {codePoint}),
    );
};
