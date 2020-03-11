import {createElement, Fragment} from 'react';
import {Selector} from 'reselect';
import {PayloadActionCreator} from 'typesafe-actions';
import {
    useSelector,
    useDispatch,
} from '../../core';
import {PathGeneratorState} from '../../type';
import className from './style.css';

export const InputSize = (
    props: {
        label: string,
        selector: Selector<PathGeneratorState, number>,
        action: PayloadActionCreator<'SetWidth' | 'SetHeight', number>,
    },
) => {
    const value = useSelector(props.selector);
    const dispatch = useDispatch();
    return createElement(
        Fragment,
        null,
        createElement(
            'button',
            {
                title: 'ふやす',
                className: className.button,
                onClick: () => dispatch(props.action(value + 1)),
            },
            createElement(
                'svg',
                {viewBox: '-1 -1 12 12'},
                createElement('path', {d: 'M5 0V10M0 5H10'}),
            ),
        ),
        createElement('div', null, `${props.label}${value}`),
        createElement(
            'button',
            {
                title: 'へらす',
                className: className.button,
                onClick: () => dispatch(props.action(value - 1)),
            },
            createElement(
                'svg',
                {viewBox: '-1 -1 12 12'},
                createElement('path', {d: 'M0 5H10'}),
            ),
        ),
    );
};
