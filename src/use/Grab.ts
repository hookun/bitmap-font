import {MutableRefObject, useEffect} from 'react';
import {noop} from '@hookun/util/noop';

export interface Position {
    x: number,
    y: number,
    d: number,
}

export interface GrabData extends Position {
    clientX: number,
    clientY: number,
    width: number,
    height: number,
}

export interface DragData extends Omit<GrabData, 'd'> {
    dx: number,
    dy: number,
}

export interface ScaleData extends DragData {
    scale: number,
}

export const getPosition = (...events: Array<MouseEvent | Touch | null>): Position => {
    const {length} = events;
    let x = 0;
    let y = 0;
    for (let index = 0; index < length; index++) {
        const event = events[index];
        if (event) {
            x += event.clientX / length;
            y += event.clientY / length;
        }
    }
    const [e1, e2] = events;
    const d = e2 ? Math.hypot(e1.clientX - e2.clientX, e1.clientY - e2.clientY) : 1;
    return {x, y, d};
};

export const getGrabbing = (
    {x: clientX, y: clientY, d}: Position,
    element: Element,
): GrabData => {
    const rect = element.getBoundingClientRect();
    const {height} = rect;
    return {
        clientX,
        clientY,
        width: rect.width,
        height,
        x: clientX - rect.left,
        y: height - (clientY - rect.top),
        d,
    };
};

export const useGrab = (
    {
        ref,
        onHover = noop,
        onEnter = noop,
        onLeave = noop,
        onGrab = noop,
        onDrag = noop,
        onScale = noop,
        onRelease = noop,
        scaleSensitivity = 0.0001,
    }: {
        ref: MutableRefObject<HTMLElement>,
        onHover?: (data: GrabData) => void,
        onEnter?: () => void,
        onLeave?: () => void,
        onGrab?: (data: GrabData) => void,
        onDrag?: (data: DragData) => void,
        onScale?: (data: ScaleData) => void,
        onRelease?: () => void,
        scaleSensitivity?: number,
    },
): void => {
    const {current: element} = ref;
    useEffect(() => {
        if (!element) {
            return noop;
        }
        let hover = false;
        let grabbing: GrabData | null = null;
        const move = (pos: Position): void => {
            if (grabbing) {
                onDrag({
                    ...grabbing,
                    dx: pos.x - grabbing.clientX,
                    dy: grabbing.clientY - pos.y,
                });
            } else {
                onHover(getGrabbing(pos, element));
            }
        };
        const grab = (pos: Position): void => {
            grabbing = getGrabbing(pos, element);
            onGrab(grabbing);
            addEventListener('mousemove', onMouseMove);
        };
        const release = (): void => {
            if (grabbing) {
                grabbing = null;
                onRelease();
                if (!hover) {
                    onLeave();
                }
            }
            removeEventListener('mousemove', onMouseMove);
        };
        const onMouseDown = (event: MouseEvent): void => {
            event.preventDefault();
            grab(getPosition(event));
        };
        const onMouseMove = (event: MouseEvent): void => {
            event.preventDefault();
            event.stopPropagation();
            move(getPosition(event));
        };
        const onTouchStart = (event: TouchEvent): void => {
            const {touches: [touch1, touch2]} = event;
            if (touch2) {
                event.preventDefault();
                grab(getPosition(touch1, touch2));
            }
        };
        const onTouchEnd = (event: TouchEvent): void => {
            if (event.touches.length < 2) {
                release();
            }
        };
        const onTouchMove = (event: TouchEvent): void => {
            if (grabbing) {
                const {touches: [touch1, touch2]} = event;
                if (touch2) {
                    event.preventDefault();
                    const {x: clientX, y: clientY, d} = getPosition(touch1, touch2);
                    const rect = element.getBoundingClientRect();
                    onScale({
                        width: rect.width,
                        height: rect.height,
                        clientX,
                        clientY,
                        x: clientX - rect.left,
                        y: clientY - rect.top,
                        dx: 0,
                        dy: 0,
                        scale: d / grabbing.d,
                    });
                }
            }
        };
        const onWheel = (event: WheelEvent): void => {
            event.preventDefault();
            const {clientX, clientY} = event;
            const rect = element.getBoundingClientRect();
            onScale({
                width: rect.width,
                height: rect.height,
                clientX,
                clientY,
                x: clientX - rect.left,
                y: clientY - rect.top,
                dx: 0,
                dy: 0,
                scale: 1 - scaleSensitivity * event.deltaY,
            });
        };
        const onMouseEnter = (): void => {
            hover = true;
            onEnter();
        };
        const onMouseLeave = (): void => {
            hover = false;
            if (!grabbing) {
                onLeave();
            }
        };
        element.addEventListener('mouseenter', onMouseEnter);
        element.addEventListener('mouseleave', onMouseLeave);
        element.addEventListener('mousedown', onMouseDown);
        element.addEventListener('mousemove', onMouseMove);
        element.addEventListener('touchstart', onTouchStart);
        element.addEventListener('touchmove', onTouchMove);
        element.addEventListener('wheel', onWheel);
        addEventListener('mouseup', release);
        addEventListener('touchend', onTouchEnd);
        return (): void => {
            onRelease();
            element.removeEventListener('mouseenter', onMouseEnter);
            element.removeEventListener('mouseleave', onMouseLeave);
            element.removeEventListener('mousedown', onMouseDown);
            element.removeEventListener('mousemove', onMouseMove);
            element.removeEventListener('touchstart', onTouchStart);
            element.removeEventListener('touchmove', onTouchMove);
            element.removeEventListener('wheel', onWheel);
            removeEventListener('mouseup', release);
            removeEventListener('touchend', onTouchEnd);
        };
    }, [element, onGrab, onRelease, onDrag, onScale, onHover, onLeave, scaleSensitivity]);
};
