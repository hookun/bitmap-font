import {createElement, ReactElement, useCallback, Fragment, MouseEvent} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {classnames} from '@hookun/util/classnames';
import {EnterEditor, ToggleEditorMenu, CloseEditor} from '../../core/Editor/action';
import {useAltKey} from '../../use/AltKey';
import className from './style.css';
import rootClassName from '../../style.css';
import {selectEditorMenu} from '../../core/Editor/selector';

export const Character = ({codePoint}: {codePoint: number}): ReactElement => {
    const dispatch = useDispatch();
    const altKey = useAltKey();
    const onEnter = useCallback(
        (event: MouseEvent) => {
            event.stopPropagation();
            dispatch(EnterEditor({codePoint, element: 'toggle'}));
        },
        [dispatch, codePoint],
    );
    const onLeave = useCallback(
        () => dispatch(EnterEditor({codePoint, element: 'root'})),
        [dispatch, codePoint],
    );
    const opened = useSelector(selectEditorMenu) === codePoint;
    const character = String.fromCodePoint(codePoint);
    return createElement(
        'button',
        {
            className: classnames(
                className.character,
                opened ? className.opened : (altKey && className.alt),
                rootClassName.stopPropagation,
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
