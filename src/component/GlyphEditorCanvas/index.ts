import {
    ReactElement,
    createElement,
    useRef,
    useCallback,
    MouseEvent,
    useState,
    useEffect,
} from 'react';
import {useCanvas, Renderer} from '../../use/Canvas';
import className from './style.css';
import {useMatrixMetrics} from '../../use/MatrixMetrix';
import {useSelector} from 'react-redux';
import {selectEditorCodePoint} from '../../core/Editor/selector';

export const GlyphEditorCanvas = ({codePoint}: {codePoint: number}): ReactElement => {
    const ref = useRef<HTMLCanvasElement>();
    const metrics = useMatrixMetrics(codePoint);
    const [coordinate, setCoordinate] = useState<[number, number] | null>(null);
    const {width, height} = useCanvas(
        ref,
        useCallback<Renderer>(
            (ctx, width, height) => {
                if (!coordinate) {
                    return;
                }
                const [x, y] = coordinate;
                const cellWidth = width / metrics.columnCount;
                const cellHeight = height / metrics.rowCount;
                ctx.fillStyle = 'red';
                ctx.fillRect(cellWidth * x, cellHeight * y, cellWidth, cellHeight);
            },
            [coordinate, metrics],
        ),
    );
    const activeEditorCodePoint = useSelector(selectEditorCodePoint);
    useEffect(
        () => {
            if (coordinate && codePoint !== activeEditorCodePoint) {
                setCoordinate(null);
            }
        },
        [coordinate, codePoint, activeEditorCodePoint],
    );
    return createElement(
        'canvas',
        {
            ref,
            className: className.canvas,
            onMouseMove: useCallback(
                ({nativeEvent: {offsetX, offsetY}}: MouseEvent) => {
                    const x = Math.floor(metrics.columnCount * offsetX / width);
                    const y = Math.floor(metrics.rowCount * offsetY / height);
                    if (!coordinate || coordinate[0] !== x || coordinate[1]) {
                        setCoordinate([x, y]);
                    }
                },
                [coordinate, metrics, width, height],
            ),
        },
    );
};
