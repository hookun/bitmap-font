import {createElement} from 'react';
import className from './style.css';

export const Checkbox = (
    props: {
        label: string,
        checked: boolean,
        onChange: (checked: boolean) => void,
    },
) => createElement(
    'button',
    {
        className: className.container,
        onClick: () => props.onChange(!props.checked),
    },
    createElement(
        'svg',
        {
            className: className.check,
            viewBox: '-1 -1 12 12',
        },
        createElement('rect', {x: 0, y: 0, width: 10, height: 10}),
        props.checked && createElement('path', {d: 'M2 4L4 8L8 2'}),
    ),
    createElement('div', null, props.label),
);
