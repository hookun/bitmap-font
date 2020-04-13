import {
    ReactElement,
    createElement,
    useRef,
    useCallback,
} from 'react';
import {useCanvas, Renderer} from '../../use/Canvas';
import className from './style.css';
import {useGrab} from '../../use/Grab';
import {useDispatch, useSelector} from 'react-redux';
import {GrabEditor, DragEditor, ReleaseEditor, SetEditorPointer} from '../../core/Editor/action';
import {selectEditor} from '../../core/Editor/selector';
import {projectPosition} from '../../core/util/projectPosition';
import {selectGuide} from '../../core/Guide/selector';

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

export const GlyphEditorCanvas = (
    {codePoint: editorCodePoint}: {codePoint: number},
): ReactElement => {
    const dispatch = useDispatch();
    const ref = useRef<HTMLCanvasElement>();
    const editor = useSelector(selectEditor);
    const {pointer, drag} = editor;
    const {origin: [ox, oy], size} = projectPosition(editor);
    const {grid} = useSelector(selectGuide);
    useCanvas(
        ref,
        useCallback<Renderer>((ctx, width, height) => {
            ctx.scale(1, -1);
            ctx.translate(0, -height);
            ctx.lineCap = ctx.lineJoin = 'round';
            const x0 = getNearestLeft({from: ox, step: size, target: 0});
            const y0 = getNearestLeft({from: oy, step: size, target: 0});
            if (grid) {
                ctx.beginPath();
                for (let x = x0 - 0.5; x <= width; x += size) {
                    ctx.moveTo(x, 0);
                    ctx.lineTo(x, height);
                }
                for (let y = y0 - 0.5; y <= width; y += size) {
                    ctx.moveTo(0, y);
                    ctx.lineTo(width, y);
                }
                ctx.strokeStyle = 'pink';
                ctx.globalAlpha = 0.1;
                ctx.stroke();
            }
            {
                let arrowSize = 6;
                ctx.beginPath();
                const originDirection = [];
                if (ox < 0) {
                    originDirection.push('Left');
                } else if (width < ox) {
                    originDirection.push('Right');
                } else {
                    ctx.moveTo(ox, 0);
                    ctx.lineTo(ox, height);
                    if (oy < 0) {
                        ctx.moveTo(ox - arrowSize, arrowSize);
                        ctx.lineTo(ox, 0);
                        ctx.lineTo(ox + arrowSize, arrowSize);
                    } else if (height < oy) {
                        ctx.moveTo(ox - arrowSize, height - arrowSize);
                        ctx.lineTo(ox, height);
                        ctx.lineTo(ox + arrowSize, height - arrowSize);
                    }
                }
                if (oy < 0) {
                    originDirection.push('Bottom');
                } else if (height < oy) {
                    originDirection.push('Top');
                } else {
                    ctx.moveTo(0, oy);
                    ctx.lineTo(width, oy);
                    if (ox < 0) {
                        ctx.moveTo(arrowSize, oy - arrowSize);
                        ctx.lineTo(0, oy);
                        ctx.lineTo(arrowSize, oy + arrowSize);
                    } else if (width < ox) {
                        ctx.moveTo(width - arrowSize, oy - arrowSize);
                        ctx.lineTo(width, oy);
                        ctx.lineTo(width - arrowSize, oy + arrowSize);
                    }
                }
                if (originDirection.length === 2) {
                    arrowSize *= 1.42;
                    switch (originDirection.join('')) {
                        case 'LeftTop':
                            ctx.moveTo(0.5, height - arrowSize);
                            ctx.lineTo(0.5, height - 0.5);
                            ctx.lineTo(arrowSize, height - 0.5);
                            ctx.moveTo(0, height);
                            ctx.lineTo(arrowSize, height - arrowSize);
                            break;
                        case 'LeftBottom':
                            ctx.moveTo(0.5, arrowSize);
                            ctx.lineTo(0.5, 0.5);
                            ctx.lineTo(arrowSize, 0.5);
                            ctx.moveTo(0, 0);
                            ctx.lineTo(arrowSize, arrowSize);
                            break;
                        case 'RightTop':
                            ctx.moveTo(width - 0.5, height - arrowSize);
                            ctx.lineTo(width - 0.5, height - 0.5);
                            ctx.lineTo(width - arrowSize, height - 0.5);
                            ctx.moveTo(width, height);
                            ctx.lineTo(width - arrowSize, height - arrowSize);
                            break;
                        case 'RightBottom':
                            ctx.moveTo(width - 0.5, arrowSize);
                            ctx.lineTo(width - 0.5, 0.5);
                            ctx.lineTo(width - arrowSize, 0.5);
                            ctx.moveTo(width, 0);
                            ctx.lineTo(width - arrowSize, arrowSize);
                            break;
                        default:
                    }
                }
                ctx.strokeStyle = 'red';
                ctx.globalAlpha = 0.5;
                ctx.stroke();
            }
            if (pointer) {
                let [x, y] = pointer;
                if (drag) {
                    x += drag[0];
                    y += drag[1];
                }
                const x0 = getNearestLeft({from: ox, step: size, target: x});
                const y0 = getNearestLeft({from: oy, step: size, target: y});
                ctx.beginPath();
                ctx.rect(x0 - 0.5, -0.5, size + 1, height + 1);
                ctx.rect(-0.5, y0 - 0.5, width + 1, size + 1);
                ctx.fillStyle = 'gold';
                ctx.globalAlpha = 0.05;
                ctx.fill();
            }
        }, [ox, oy, size, pointer, drag, grid]),
    );
    useGrab({
        ref,
        onHover: useCallback((data) => dispatch(SetEditorPointer(data)), [dispatch]),
        onLeave: useCallback(() => dispatch(SetEditorPointer(null)), [dispatch]),
        onGrab: useCallback((data) => dispatch(GrabEditor(data)), [dispatch]),
        onDrag: useCallback((data) => dispatch(DragEditor(data)), [dispatch]),
        onScale: useCallback((data) => dispatch(ReleaseEditor(data)), [dispatch]),
        onRelease: useCallback(() => dispatch(ReleaseEditor()), [dispatch]),
    });
    return createElement('canvas', {ref, className: className.canvas});
};
