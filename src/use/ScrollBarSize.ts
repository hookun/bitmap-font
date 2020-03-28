import {useMemo} from 'react';

export const useScrollBarSize = (): number => useMemo<number>(() => {
    const container = document.createElement('div');
    Object.assign(container.style, {
        width: '100px',
        height: '100px',
        overflow: 'scroll',
    });
    const body = document.createElement('div');
    container.append(body);
    Object.assign(body.style, {height: '200px'});
    document.body.append(container);
    const {width: containerWidth} = container.getBoundingClientRect();
    const {width: bodyWidth} = body.getBoundingClientRect();
    container.remove();
    return containerWidth - bodyWidth;
}, []);
