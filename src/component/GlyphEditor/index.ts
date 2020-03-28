import {createElement, ReactElement} from 'react';

export const GlyphEditor = ({codePoint}: {codePoint: number}): ReactElement => {
    return createElement(
        'div',
        null,
        `Edit ${codePoint}`,
    );
};
