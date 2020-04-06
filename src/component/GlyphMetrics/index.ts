import {ReactElement, createElement} from 'react';

export const GlyphMetrics = (): ReactElement => createElement(
    'svg',
    {
        viewBox: '-2 -5 120 50',
    },
    createElement(
        'g',
        {
            style: {
                opacity: 0.5,
                fill: 'none',
                stroke: 'var(--ForegroundColor)',
                strokeDasharray: '1 3',
            },
        },
        createElement('path', {d: 'M0 0H116'}),
        createElement('path', {d: 'M0 30H116'}),
        createElement('path', {d: 'M0 40H116'}),
    ),
    createElement(
        'g',
        {
            style: {
                fontSize: 7,
                fill: 'var(--ForegroundColor)',
                stroke: 'none',
            },
        },
        createElement('text', {x: 84, y: 17}, 'ascent'),
        createElement('text', {x: 84, y: 37}, 'descent'),
        createElement('path', {
            d: 'm1,0v2c3,0 4,1 4,4v18c0,3 -1,4 -4,4v2H16V28H12V16h13v8c0,3 -1,4 -4,4v2H36L32,28V2L36,0H21v2c3,0 4,1 4,4v8H12V2h4V0Zm43,10c-6,0 -10,5 -10,10 0,6 4,10 10,10 4,0 9,-2 10,-7h-4c0,6 -11,6 -11,-3H54C54,15 50,10 44,10Zm9,0 5,17 -11,13h8L80,10H73L62,23 61,10Zm-9,2c3,0 6,2 6,6H39c0,-4 3,-6 5,-6z',
        }),
    ),
);
