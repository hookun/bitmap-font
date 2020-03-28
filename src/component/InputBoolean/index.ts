import {createElement, useCallback, ReactElement} from 'react';
import className from './style.css';
import {PayloadActionCreator} from 'typesafe-actions';
import {BMFSelector} from '../../core/setup';
import {useSelector, useDispatch} from 'react-redux';

export const InputBoolean = (
    {label, selector, action}: {
        label: string,
        selector: BMFSelector<boolean>,
        action: PayloadActionCreator<string, boolean>,
    },
): ReactElement => {
    const checked = useSelector(selector);
    const dispatch = useDispatch();
    return createElement(
        'button',
        {
            className: className.container,
            onClick: useCallback(
                () => dispatch(action(!checked)),
                [checked, dispatch, action],
            ),
        },
        createElement(
            'svg',
            {
                className: className.check,
                viewBox: '-1 -1 12 12',
            },
            createElement('rect', {x: 0, y: 0, width: 10, height: 10}),
            checked && createElement('path', {d: 'M2 4L4 8L8 2'}),
        ),
        createElement('div', null, label),
    );
};
