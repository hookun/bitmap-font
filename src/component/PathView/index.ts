import {createElement, Fragment} from 'react';
import {useSelector} from '../../core';
import {
    selectWidth,
    selectHeight,
    selectArrowSize,
    selectArrowLength,
    selectPathD,
    selectPathLength,
    selectPathDirection,
} from '../../selector';
import className from './style.css';

export const PathView = () => {
    const width = useSelector(selectWidth);
    const height = useSelector(selectHeight);
    const arrowSize = useSelector(selectArrowSize);
    const arrowLength = useSelector(selectArrowLength);
    const d = useSelector(selectPathD);
    const length = useSelector(selectPathLength);
    const pathDirection = useSelector(selectPathDirection);
    const animationDuration = length / 10;
    return createElement(
        'svg',
        {
            viewBox: [
                -arrowSize,
                -arrowSize,
                width + arrowSize * 2,
                height + arrowSize * 2,
            ].join(' '),
            className: className.svg,
        },
        pathDirection && createElement(
            Fragment,
            null,
            createElement(
                'path',
                {
                    className: className.path,
                    d,
                    strokeWidth: arrowSize / 4,
                },
            ),
            createElement(
                'polygon',
                {
                    className: className.marker,
                    points: [
                        [arrowSize / -2, 0],
                        [-arrowSize, -arrowSize],
                        [arrowSize, 0],
                        [-arrowSize, arrowSize],
                    ]
                    .map(([x, y]) => `${x},${y}`)
                    .join(' '),
                },
                createElement(
                    'animateMotion',
                    {
                        path: d,
                        dur: `${animationDuration}s`,
                        repeatCount: 'indefinite',
                        rotate: 'auto',
                        begin: `${-(animationDuration * arrowLength / length).toFixed(1)}s`,
                    },
                ),
            ),
        ),
    );
};
