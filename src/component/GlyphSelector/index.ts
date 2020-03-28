import {
    useRef,
    ReactElement,
    createElement,
    useEffect,
    useMemo,
    useCallback,
} from 'react';
import {useDispatch} from 'react-redux';
import {
    FixedSizeGrid,
    FixedSizeGridProps,
    GridChildComponentProps,
} from 'react-window';
import className from './style.css';
import {getRectSize, useRectSize} from '../../use/RectSize';
import {useColor} from '../../use/Color';
import {useScrollBarSize} from '../../use/ScrollBarSize';
import {usePrintability} from '../../use/Printability';
import {MaxCodePoint} from '../../constants';
import {PickCharacter} from '../../core/Font/action';

export const GlyphSelectorCell = (
    {
        style,
        rowIndex,
        columnIndex,
        data: {
            columnCount,
            headerHeight,
            color,
            inverseColor,
        },
    }: Omit<GridChildComponentProps, 'data'> & {
        data: {
            columnCount: number,
            headerHeight: number,
            color: string,
            inverseColor: string,
        },
    },
): ReactElement => {
    const ref = useRef<HTMLCanvasElement>();
    const codePoint = rowIndex * columnCount + columnIndex;
    const printable = usePrintability(codePoint);
    const hex = codePoint.toString(16).padStart(4, '0').toUpperCase();
    useEffect(() => {
        if (printable) {
            const {width, height, element: canvas} = getRectSize(ref);
            if (canvas) {
                const character = String.fromCodePoint(codePoint);
                const ctx = canvas.getContext('2d');
                const dpr = devicePixelRatio;
                Object.assign(canvas, {width: width * dpr, height: height * dpr});
                ctx.scale(dpr, dpr);
                const cx = 1 + (width - 1) / 2;
                {
                    ctx.save();
                    ctx.textBaseline = 'middle';
                    ctx.textAlign = 'center';
                    ctx.fillStyle = color;
                    ctx.shadowOffsetY = 1;
                    ctx.shadowColor = inverseColor;
                    ctx.shadowBlur = 2;
                    ctx.font = `${(headerHeight * 0.9).toFixed(1)}px sans-serif`;
                    ctx.fillText(character, cx, 1 + headerHeight / 2);
                    ctx.restore();
                }
            }
        }
    }, [ref, codePoint, printable, hex, headerHeight, color, inverseColor]);
    const dispatch = useDispatch();
    const onClick = useCallback(() => {
        dispatch(PickCharacter(codePoint));
    }, [dispatch, codePoint]);
    if (MaxCodePoint < codePoint) {
        return null;
    }
    if (printable) {
        return createElement(
            'canvas',
            {
                ref,
                className: className.cell,
                title: hex,
                style,
                onClick,
            },
        );
    }
    return createElement(
        'div',
        {
            className: className.unprintable,
            title: hex,
            style,
        },
    );
};

export const GlyphSelector = (): ReactElement => {
    const ref = useRef();
    const headerHeight = 18;
    const color = useColor(ref);
    const scrollBarWidth = useScrollBarSize();
    const {width, height} = useRectSize(ref, 500);
    const props = useMemo<FixedSizeGridProps | null>(() => {
        if (width === 0 || height === 0) {
            return null;
        }
        const cellSize = 40;
        const availableWidth = width - scrollBarWidth;
        const columnCount = Math.floor(availableWidth / cellSize);
        const rowCount = 0 < columnCount ? Math.ceil(MaxCodePoint / columnCount) : 0;
        const columnWidth = Math.floor(availableWidth / columnCount);
        const rowHeight = columnWidth + headerHeight + 1;
        return {
            width,
            height,
            columnCount,
            rowCount,
            columnWidth,
            rowHeight,
            className: className.grid,
            children: GlyphSelectorCell,
            itemData: {
                columnCount,
                headerHeight,
                color: `rgb(${color.join(',')})`,
                inverseColor: `rgb(${color.map((x) => 255 - x).join(',')})`,
            },
        };
    }, [width, height, scrollBarWidth, color]);
    return createElement(
        'div',
        {
            ref,
            className: className.container,
            style: props && {
                '--HeaderHeight': `${headerHeight}px`,
                '--Background': `rgba(${color.concat(0.15).join(',')})`,
                '--CellWidth': `${props.columnWidth}px`,
                '--CellHeight': `${props.rowHeight}px`,
                '--RowWidth': `${props.columnCount * props.columnWidth}px`,
            },
        },
        props && createElement(FixedSizeGrid, props),
    );
};
