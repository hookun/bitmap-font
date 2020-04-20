import {MutableRefObject, useEffect} from 'react';
import {noop} from '@hookun/util/noop';
export const glabKey = `glab${Date.now().toString(34)}`;

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
    button?: number,
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
    button?: number,
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
        button,
    };
};

export const setGrab = (id: string): void => {
    document.documentElement.dataset[glabKey] = id;
};

export const resetGrab = (): void => {
    delete document.documentElement.dataset[glabKey];
};

export const isGrabbing = (id?: string): boolean => {
    const {documentElement: {dataset}} = document;
    return id ? id === dataset[glabKey] : glabKey in dataset;
};

export const useGrab = (
    {
        id,
        ref,
        onHover = noop,
        onEnter = noop,
        onLeave = noop,
        onGrab = noop,
        onDrag = noop,
        onScale = noop,
        onClick = noop,
        onDraw = noop,
        onRelease = noop,
        scaleSensitivity = 0.0001,
        clickThreshold = 4,
    }: {
        id: string,
        ref: MutableRefObject<HTMLElement>,
        onHover?: (data: GrabData) => void,
        onEnter?: () => void,
        onLeave?: () => void,
        onGrab?: (data: GrabData) => void,
        onDrag?: (data: DragData) => void,
        onScale?: (data: ScaleData) => void,
        onClick?: (data: GrabData) => void,
        onDraw?: (data: GrabData) => void,
        onRelease?: () => void,
        scaleSensitivity?: number,
        clickThreshold?: number,
    },
): void => {
    const {current: element} = ref;
    useEffect(() => {
        if (!element) {
            return noop;
        }
        let hover = false;
        let clickFlag = false;
        let grabbing: GrabData | null = null;
        const move = (pos: Position, shift?: boolean): void => {
            if (grabbing) {
                const dx = pos.x - grabbing.clientX;
                const dy = grabbing.clientY - pos.y;
                if (clickFlag) {
                    if (clickThreshold < Math.hypot(dx, dy)) {
                        clickFlag = false;
                    }
                }
                if (shift) {
                    onDraw(getGrabbing(pos, element, grabbing.button));
                } else if (!clickFlag) {
                    onDrag({...grabbing, dx, dy});
                }
            } else {
                onHover(getGrabbing(pos, element));
            }
        };
        const grab = (pos: Position, button?: number): void => {
            grabbing = getGrabbing(pos, element, button);
            clickFlag = true;
            setGrab(id);
            onGrab(grabbing);
            element.removeEventListener('mousemove', onMouseMove);
            addEventListener('mousemove', onMouseMove);
        };
        const release = (): void => {
            if (grabbing) {
                if (clickFlag) {
                    onClick(grabbing);
                }
                grabbing = null;
                onRelease();
                if (!hover) {
                    onLeave();
                }
            }
            removeEventListener('mousemove', onMouseMove);
            element.addEventListener('mousemove', onMouseMove, {passive: true});
            resetGrab();
        };
        const onMouseDown = (event: MouseEvent): void => {
            event.preventDefault();
            grab(getPosition(event), event.button);
        };
        const onMouseMove = (event: MouseEvent): void => {
            if (isGrabbing()) {
                if (!isGrabbing(id)) {
                    return;
                }
            }
            event.stopPropagation();
            move(getPosition(event), event.shiftKey);
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
            const {touches: [touch1, touch2]} = event;
            if (grabbing && touch2) {
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
            } else if (!touch2) {
                move(getPosition(touch1), event.shiftKey);
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
        const onContextMenu = (event: MouseEvent): void => {
            event.preventDefault();
        };
        element.addEventListener('contextmenu', onContextMenu);
        element.addEventListener('mouseenter', onMouseEnter);
        element.addEventListener('mouseleave', onMouseLeave);
        element.addEventListener('mousedown', onMouseDown);
        element.addEventListener('mousemove', onMouseMove, {passive: true});
        element.addEventListener('touchstart', onTouchStart);
        element.addEventListener('touchmove', onTouchMove, {passive: false});
        element.addEventListener('wheel', onWheel);
        addEventListener('mouseup', release);
        addEventListener('touchend', onTouchEnd);
        return (): void => {
            onRelease();
            element.removeEventListener('contextmenu', onContextMenu);
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
    }, [
        id,
        element,
        onGrab,
        onRelease,
        onDrag,
        onScale,
        onHover,
        onEnter,
        onLeave,
        onClick,
        onDraw,
        scaleSensitivity,
        clickThreshold,
    ]);
};
