import {
    ReactElement,
    createElement,
    useRef,
    useCallback,
} from 'react';
import {rgbToHex} from '@hookun/util/color';
import {useCanvas, Renderer} from '../../use/Canvas';
import className from './style.css';
import {useGrab} from '../../use/Grab';
import {useDispatch, useSelector} from 'react-redux';
import {GrabEditor, DragEditor, ReleaseEditor, SetEditorPointer} from '../../core/Editor/action';
import {selectEditor} from '../../core/Editor/selector';
import {projectPosition} from '../../core/util/projectPosition';
import {TogglePixel} from '../../core/Glyph/action';
import {useColor} from '../../use/Color';
import {Point} from '../../core/type';
import {useGlyph} from '../../use/Glyph';
import {selectFontDescent, selectFontAscent} from '../../core/Font/selector';
import {OpacityStepCount} from '../../core/Editor/util/patchEditorState';

export const getNearestLeft = (
    {from, step, target}: {
        from: number,
        step: number,
        target: number,
    },
): number => {
    let result = from;
    if (result < target) {
        while (result < target - step) {
            result += step;
        }
    } else {
        while (target < result) {
            result -= step;
        }
    }
    return result;
};

export const getDirection = (
    x: number,
    y: number,
): number => (x < y ? 0 : 1) + (-x < y ? 0 : 2);

export const drawArrowToOrigin = (
    {ctx, width, height, ox, oy}: {
        ctx: CanvasRenderingContext2D,
        width: number,
        height: number,
        ox: number,
        oy: number,
    },
): void => {
    const cx = width / 2;
    const cy = height / 2;
    const aspectRatio = height / width;
    const x = ox - cx;
    const y = oy - cy;
    let head: Point | undefined;
    switch (getDirection(x * aspectRatio, y)) {
        case 0: // Top
            head = [x * cy / y, cy];
            break;
        case 1: // Right
            head = [cx, y * cx / x];
            break;
        case 2: // Left
            head = [-cx, -y * cx / x];
            break;
        case 3: // Bottom
            head = [-x * cy / y, -cy];
            break;
        default:
    }
    const d = Math.hypot(head[0], head[1]);
    const arrowHeight = 10;
    const arrowWidth = 4;
    ctx.save();
    ctx.globalAlpha = 0.7;
    ctx.translate(cx, cy);
    ctx.scale(1, -1);
    const arg = Math.atan2(-y, x);
    {
        const fontSize = 9;
        ctx.font = `${fontSize}px Monaco, Consolas, monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const text = (Math.hypot(x, y) - d).toFixed(0);
        const {
            width,
            actualBoundingBoxAscent,
            actualBoundingBoxDescent,
        } = ctx.measureText(text);
        const height = actualBoundingBoxAscent + actualBoundingBoxDescent;
        const radius = Math.max(width, height);
        const dx = (radius + fontSize) * Math.cos(arg) * width / radius / 2;
        const dy = (radius + fontSize) * Math.sin(arg) * height / radius / 2;
        const r = (d - arrowHeight) / d;
        ctx.fillText(
            text,
            head[0] * r - dx,
            -head[1] * r - dy,
        );
    }
    ctx.rotate(arg);
    ctx.translate(d, 0);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-arrowHeight, arrowWidth);
    ctx.lineTo(-arrowHeight, -arrowWidth);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
};

export const drawAxis = (
    {ctx, width, height, ox, oy}: {
        ctx: CanvasRenderingContext2D,
        width: number,
        height: number,
        ox: number,
        oy: number,
    },
): void => {
    let originIsInView = true;
    ctx.beginPath();
    if (0 <= ox && ox <= width) {
        ctx.fillRect(ox, 0, 1, height);
    } else {
        originIsInView = false;
    }
    if (0 <= oy && oy <= height) {
        ctx.fillRect(0, oy, width, 1);
    } else {
        originIsInView = false;
    }
    ctx.stroke();
    if (!originIsInView) {
        drawArrowToOrigin({ctx, width, height, ox, oy});
    }
};

export const drawGrid = (
    {ctx, width, height, size, x0, y0}: {
        ctx: CanvasRenderingContext2D,
        width: number,
        height: number,
        size: number,
        x0: number,
        y0: number,
    },
): void => {
    ctx.beginPath();
    for (let x = x0; x <= width; x += size) {
        ctx.rect(x, 0, 1, height);
    }
    for (let y = y0; y <= width; y += size) {
        ctx.rect(0, y, width, 1);
    }
    ctx.fill();
};

export const drawPointer = (
    {ctx, width, height, pointer, size, ox, oy, drag}: {
        ctx: CanvasRenderingContext2D,
        pointer: Point,
        width: number,
        height: number,
        size: number,
        ox: number,
        oy: number,
        drag?: Point,
    },
): void => {
    let [x, y] = pointer;
    if (drag) {
        x += drag[0];
        y += drag[1];
    }
    const x0 = getNearestLeft({from: ox, step: size, target: x});
    const y0 = getNearestLeft({from: oy, step: size, target: y});
    ctx.beginPath();
    ctx.rect(x0, 0, size, height);
    ctx.rect(0, y0, width, size);
    ctx.fill();
};

export const drawBoundingLines = (
    {ctx, width, height, size, ox, oy, ascent, descent, advance}: {
        ctx: CanvasRenderingContext2D,
        width: number,
        height: number,
        size: number,
        ox: number,
        oy: number,
        ascent: number,
        descent: number,
        advance: number,
    },
): void => {
    ctx.beginPath();
    ctx.rect(0, oy + ascent * size, width, 1);
    ctx.rect(0, oy + (descent === 0 ? -1 : -descent * size), width, 1);
    ctx.rect(ox + advance * size, 0, 1, height);
    ctx.fill();
};

export const GlyphEditorCanvas = (
    {codePoint}: {codePoint: number},
): ReactElement => {
    const dispatch = useDispatch();
    const ref = useRef<HTMLCanvasElement>();
    const editor = useSelector(selectEditor);
    const ascent = useSelector(selectFontAscent);
    const descent = useSelector(selectFontDescent);
    const {pointer, axis, baseline, drag, grid} = editor;
    const {origin: [ox, oy], size} = projectPosition(editor);
    const color = rgbToHex(useColor(ref));
    const glyph = useGlyph(codePoint);
    useCanvas(
        ref,
        useCallback<Renderer>((ctx, width, height) => {
            ctx.scale(1, -1);
            ctx.translate(0, -height);
            const x0 = getNearestLeft({from: ox, step: size, target: 0});
            const y0 = getNearestLeft({from: oy, step: size, target: 0});
            {
                ctx.save();
                ctx.transform(size, 0, 0, size, ox, oy);
                ctx.beginPath();
                for (const [x, column] of glyph.pixels) {
                    for (const y of column) {
                        ctx.rect(x, y, 1, 1);
                    }
                }
                ctx.fillStyle = color;
                ctx.fill();
                ctx.restore();
            }
            if (0 < grid) {
                ctx.fillStyle = color;
                ctx.globalAlpha = grid / (OpacityStepCount - 1);
                drawGrid({ctx, width, height, size, x0, y0});
                ctx.globalAlpha = 1;
            }
            if (0 < axis) {
                ctx.fillStyle = 'red';
                ctx.globalAlpha = axis / (OpacityStepCount - 1);
                drawAxis({ctx, width, height, ox, oy});
            }
            if (0 < baseline) {
                ctx.fillStyle = 'orange';
                ctx.globalAlpha = baseline / (OpacityStepCount - 1);
                drawBoundingLines({ctx, width, height, size, ox, oy, ascent, descent, advance: glyph.advance});
            }
            if (pointer) {
                ctx.fillStyle = color;
                ctx.globalAlpha = 0.05;
                drawPointer({ctx, width, height, pointer, size, ox, oy, drag});
                ctx.globalAlpha = 1;
            }
        }, [ox, oy, size, pointer, drag, axis, baseline, grid, color, glyph, ascent, descent]),
    );
    useGrab({
        id: `${codePoint.toString(34)}`,
        ref,
        onClick: useCallback((data) => dispatch(TogglePixel(data)), [dispatch]),
        onHover: useCallback((data) => dispatch(SetEditorPointer(data)), [dispatch]),
        onLeave: useCallback(() => dispatch(SetEditorPointer(null)), [dispatch]),
        onGrab: useCallback((data) => dispatch(GrabEditor(data)), [dispatch]),
        onDrag: useCallback((data) => dispatch(DragEditor(data)), [dispatch]),
        onScale: useCallback((data) => dispatch(ReleaseEditor(data)), [dispatch]),
        onRelease: useCallback(() => dispatch(ReleaseEditor()), [dispatch]),
    });
    return createElement('canvas', {ref, className: className.canvas});
};
