import {createElement, Fragment, ReactElement, useCallback} from 'react';
import {Selector} from 'reselect';
import {PayloadActionCreator} from 'typesafe-actions';
import {
    useSelector,
    useDispatch,
} from '../../old-core';
import {PathGeneratorState} from '../../type';
import className from './style.css';

export const InputSize = (
    {label, selector, action}: {
        label: string,
        selector: Selector<PathGeneratorState, number>,
        action: PayloadActionCreator<'SetWidth' | 'SetHeight', number>,
    },
): ReactElement => {
    const value = useSelector(selector);
    const dispatch = useDispatch();
    return createElement(
        Fragment,
        null,
        createElement(
            'button',
            {
                title: 'ふやす',
                className: className.button,
                onClick: useCallback(
                    () => dispatch(action(value + 1)),
                    [dispatch, action, value],
                ),
            },
            createElement(
                'svg',
                {viewBox: '-1 -1 12 12'},
                createElement('path', {d: 'M5 0V10M0 5H10'}),
            ),
        ),
        createElement('div', null, `${label}${value}`),
        createElement(
            'button',
            {
                title: 'へらす',
                className: className.button,
                onClick: useCallback(
                    () => dispatch(action(value - 1)),
                    [dispatch, action, value],
                ),
            },
            createElement(
                'svg',
                {viewBox: '-1 -1 12 12'},
                createElement('path', {d: 'M0 5H10'}),
            ),
        ),
    );
};
