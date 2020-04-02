import {
    useRef,
    ReactElement,
    createElement,
    useEffect,
    useMemo,
    useCallback,
    useState,
    Fragment,
    FormEvent,
} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
    FixedSizeGrid,
    FixedSizeGridProps,
    GridChildComponentProps,
} from 'react-window';
import className from './style.css';
import {getRectSize, useRectSize} from '../../use/RectSize';
import {useColor} from '../../use/Color';
import {useScrollBarSize} from '../../use/ScrollBarSize';
import {MaxCodePoint} from '../../constants';
import {OpenEditor, OpenEditors} from '../../core/Font/action';
import {toHex} from '../../util/codePoint';
import {isPrintable} from '../../util/isPrintable';
import {classnames} from '../../util/classnames';
import {selectFontEdting} from '../../core/Font/selector';

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
    const codePointList = useSelector(selectFontEdting);
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
    }, [ref, codePoint, printable, headerHeight, color, inverseColor]);
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

export const GlyphSelector = (): ReactElement => {
    const [
        [firstCodePoint, lastCodePoint],
        setCodePointRange,
    ] = useState<[number, number]>([0, 0]);
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
    }, [width, height, scrollBarWidth, color]);
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
