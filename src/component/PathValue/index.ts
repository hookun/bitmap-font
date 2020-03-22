import {createElement, useCallback, ReactElement} from 'react';
import {useSelector} from '../../old-core';
import {selectPathD} from '../../selector';
import className from './style.css';

export const PathValue = (): ReactElement => {
    const d = useSelector(selectPathD);
    return createElement(
        'input',
        {
            type: 'text',
            className: className.container,
            value: d,
            readOnly: true,
            onClick: useCallback(
                (event) => event.currentTarget.select(),
                [],
            ),
        },
    );
};
