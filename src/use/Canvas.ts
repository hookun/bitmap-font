import {useMemo, MutableRefObject} from 'react';
import {noop} from '@hookun/util/noop';
import {useRectSize} from './RectSize';
import {useDevicePixelRatio} from './DevicePixelRatio';

export interface Renderer {
    (
        ctx: CanvasRenderingContext2D,
        width: number,
        height: number,
    ): void,
}

export interface CanvasData {
    width: number,
    height: number,
    dpr: number,
    render: () => void,
}

export const useCanvas = (
    ref: MutableRefObject<HTMLCanvasElement>,
    renderer: Renderer,
): CanvasData => {
    const {width, height} = useRectSize(ref);
    const dpr = useDevicePixelRatio();
    return {
        width,
        height,
        dpr,
        render: useMemo(
            () => {
                const canvas = ref.current;
                if (!canvas) {
                    return noop;
                }
                canvas.width = width * dpr;
                canvas.height = height * dpr;
                const ctx = canvas.getContext('2d');
                const render = (): void => {
                    ctx.save();
                    ctx.scale(dpr, dpr);
                    ctx.clearRect(0, 0, width, height);
                    renderer(ctx, width, height);
                    ctx.restore();
                };
                requestAnimationFrame(render);
                return render;
            },
            [width, height, ref, renderer, dpr],
        ),
    };
};
