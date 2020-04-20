import {
    useRef,
    ReactElement,
    createElement,
    useMemo,
    useCallback,
    useState,
    Fragment,
    FormEvent,
    useEffect,
    MutableRefObject,
} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {classnames} from '@hookun/util/classnames';
import {
    FixedSizeGrid,
    FixedSizeGridProps,
    GridChildComponentProps,
} from 'react-window';
import className from './style.css';
import {useRectSize} from '../../use/RectSize';
import {useColor} from '../../use/Color';
import {useScrollBarSize} from '../../use/ScrollBarSize';
import {MaxCodePoint} from '../../constants';
import {toHex} from '../../util/codePoint';
import {isPrintable} from '../../util/isPrintable';
import {selectEditngCodePoints, selectEditorScroll, selectEditorCodePoint} from '../../core/Editor/selector';
import {OpenEditor, OpenEditors, SetEditorScroll} from '../../core/Editor/action';
import {Point} from '../../core/type';
import {useGlyph} from '../../use/Glyph';
import {selectFontAscent, selectFontDescent} from '../../core/Font/selector';
import {useCanvas} from '../../use/Canvas';

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
    const printable = isPrintable(codePoint);
    const hex = toHex(codePoint);
    const codePointList = useSelector(selectEditngCodePoints);
    const ascent = useSelector(selectFontAscent);
    const descent = useSelector(selectFontDescent);
    const {pixels} = useGlyph(codePoint);
    useCanvas(ref, useCallback((ctx, width, height) => {
        const character = String.fromCodePoint(codePoint);
        {
            ctx.save();
            ctx.translate(1 + (width - 1) / 2, 1 + headerHeight / 2);
            ctx.textBaseline = 'middle';
            ctx.textAlign = 'center';
            ctx.fillStyle = color;
            ctx.shadowOffsetY = 1;
            ctx.shadowColor = inverseColor;
            ctx.shadowBlur = 2;
            ctx.font = `${(headerHeight * 0.9).toFixed(1)}px sans-serif`;
            ctx.fillText(character, 0, 0);
            ctx.restore();
        }
        if (0 < pixels.size) {
            ctx.save();
            const availableHeight = height - headerHeight;
            const margin = width * 0.15;
            const scale = (availableHeight - margin * 2) / (ascent + descent);
            ctx.transform(scale, 0, 0, -scale, margin, height - margin);
            ctx.translate(0, descent);
            ctx.beginPath();
            for (const [x, column] of pixels) {
                for (const y of column) {
                    ctx.rect(x, y, 1, 1);
                }
            }
            ctx.fillStyle = color;
            ctx.fill();
            ctx.restore();
        }
    }, [codePoint, color, headerHeight, inverseColor, pixels, ascent, descent]));
    const dispatch = useDispatch();
    const onClick = useCallback(() => {
        dispatch(OpenEditor(codePoint));
    }, [dispatch, codePoint]);
    if (MaxCodePoint < codePoint) {
        return null;
    }
    if (printable) {
        return createElement(
            'canvas',
            {
                ref,
                className: classnames(
                    className.cell,
                    codePointList.includes(codePoint) && className.editing,
                ),
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

export const GlyphForm = (): ReactElement => {
    const ref = useRef<HTMLInputElement>();
    const dispatch = useDispatch();
    return createElement(
        'form',
        {
            className: className.form,
            onSubmit: (event: FormEvent<HTMLFormElement>) => {
                event.preventDefault();
                const {value} = ref.current;
                if (value) {
                    dispatch(OpenEditors(value));
                }
                event.currentTarget.reset();
            },
        },
        createElement(
            'input',
            {
                ref,
                type: 'text',
                defaultValue: '',
                placeholder: 'あいうえお',
            },
        ),
        createElement(
            'button',
            {
                type: 'submit',
            },
            '編集',
        ),
    );
};

export const useScroll = (
    ref: MutableRefObject<FixedSizeGrid>,
    columnCount: number,
): void => {
    const codePoint = useSelector(selectEditorCodePoint);
    const scroll = useSelector(selectEditorScroll);
    const dispatch = useDispatch();
    useEffect(() => {
        if (scroll && 0 < codePoint && 0 < columnCount) {
            const rowIndex = Math.floor(codePoint / columnCount);
            const columnIndex = codePoint - rowIndex * columnCount;
            ref.current.scrollToItem({align: 'center', rowIndex, columnIndex});
            dispatch(SetEditorScroll(false));
        }
    }, [scroll, dispatch, ref, codePoint, columnCount]);
};

export const GlyphSelector = (): ReactElement => {
    const [
        [firstCodePoint, lastCodePoint],
        setCodePointRange,
    ] = useState<Point>([0, 0]);
    const ref = useRef<HTMLDivElement>();
    const gridRef = useRef<FixedSizeGrid>();
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
            ref: gridRef,
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
            onItemsRendered: ({
                visibleRowStartIndex,
                visibleColumnStartIndex,
                visibleRowStopIndex,
                visibleColumnStopIndex,
            }): void => setCodePointRange([
                (visibleRowStartIndex + 1) * columnCount + visibleColumnStartIndex,
                (visibleRowStopIndex - 1) * columnCount + visibleColumnStopIndex,
            ]),
        };
    }, [gridRef, width, height, scrollBarWidth, color]);
    useScroll(gridRef, props ? props.columnCount : 0);
    const RowWidth = props ? props.columnCount * props.columnWidth : 0;
    return createElement(
        Fragment,
        null,
        0 < RowWidth && createElement(
            'div',
            {
                className: className.header,
                style: {width: `${RowWidth + 1}px`},
            },
            createElement(
                'div',
                {className: className.range},
                createElement('div', null, `${toHex(firstCodePoint)} ...`),
                createElement('div', null, `... ${toHex(lastCodePoint)}`),
            ),
            createElement(GlyphForm),
        ),
        createElement(
            'div',
            {
                ref,
                className: classnames(
                    className.container,
                    !props && className.loading,
                ),
                style: props && {
                    '--HeaderHeight': `${headerHeight}px`,
                    '--CellWidth': `${props.columnWidth}px`,
                    '--CellHeight': `${props.rowHeight}px`,
                    '--RowWidth': `${RowWidth}px`,
                },
            },
            props && createElement(FixedSizeGrid, props),
        ),
    );
};
