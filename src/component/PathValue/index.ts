import {createElement, Fragment} from 'react';
import {useSelector} from '../../core';
import {selectPathD} from '../../selector';
import className from './style.css';

export const PathValue = () => {
    const d = useSelector(selectPathD);
    return createElement(
        'pre',
        {className: className.container},
        d,
    );
};
