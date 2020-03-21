import {PathString} from './PathString';

const Up = 1;
const Down = 2;
const Left = 4;
const Right = 8;

const getEdges = (
    matrix: Array<boolean>,
    columnCount: number,
): Map<number, number> => {
    const edgeCount = columnCount + 1;
    const edges = new Map<number, number>();
    const addDirection = (
        index: number,
        direction: number,
    ): void => {
        edges.set(index, (edges.get(index) || 0) | direction);
    };
    matrix.forEach((filled, index) => {
        if (filled) {
            const rowIndex = Math.floor(index / columnCount);
            const columnIndex = index % columnCount;
            if (!matrix[index - columnCount]) {
                addDirection(rowIndex * edgeCount + columnIndex, Right);
            }
            if (!matrix[index + columnCount]) {
                addDirection((rowIndex + 1) * edgeCount + columnIndex + 1, Left);
            }
            if (columnIndex === 0 || !matrix[index - 1]) {
                addDirection((rowIndex + 1) * edgeCount + columnIndex, Up);
            }
            if (columnIndex === columnCount - 1 || !matrix[index + 1]) {
                addDirection(rowIndex * edgeCount + columnIndex + 1, Down);
            }
        }
    });
    return new Map([...edges].sort(([a], [b]) => a < b ? -1 : 1));
};

const getStartIndex = (
    edges: Map<number, number>,
): number => {
    const iterator = edges[Symbol.iterator]();
    const result = iterator.next();
    return result.done ? -1 : result.value[0];
};

const getNextDirection = (
    currentDirection: number,
    availableDirections: number,
): number => {
    switch (currentDirection) {
        case Right:
            if (Up & availableDirections) {
                return Up;
            }
            if (Down & availableDirections) {
                return Down;
            }
            break;
        case Down:
            if (Right & availableDirections) {
                return Right;
            }
            if (Left & availableDirections) {
                return Left;
            }
            break;
        case Left:
            if (Down & availableDirections) {
                return Down;
            }
            if (Up & availableDirections) {
                return Up;
            }
            break;
        case Up:
            if (Left & availableDirections) {
                return Left;
            }
            if (Right & availableDirections) {
                return Right;
            }
            break;
        default:
    }
    return 0;
};

const step = (
    {edges, index, direction, edgeCount}: {
        edges: Map<number, number>,
        index: number,
        direction: number,
        edgeCount: number,
    },
): number => {
    const availableDirections = edges.get(index);
    if (availableDirections === direction) {
        edges.delete(index);
    } else {
        edges.set(index, availableDirections - direction);
    }
    switch (direction) {
        case Left:
            index -= 1;
            break;
        case Right:
            index += 1;
            break;
        case Down:
            index += edgeCount;
            break;
        case Up:
            index -= edgeCount;
            break;
        default:
            throw new Error(`InvalidDirection: The direction ${direction} is invalid.`);
    }
    return index;
};

export const calculatePath = (
    matrix: Array<boolean>,
    columnCount: number,
): PathString => {
    const edges = getEdges(matrix, columnCount);
    const path = new PathString();
    const edgeCount = columnCount + 1;
    let index = 0;
    let direction = 0;
    let distance = 0;
    while (0 <= index) {
        const availableDirections = edges.get(index);
        if (direction & availableDirections) {
            index = step({edges, index, direction, edgeCount});
            distance += 1;
        } else {
            switch (direction) {
                case Right:
                    path.lineBy(distance, 0);
                    break;
                case Left:
                    path.lineBy(-distance, 0);
                    break;
                case Up:
                    path.lineBy(0, -distance);
                    break;
                case Down:
                    path.lineBy(0, distance);
                    break;
                default:
            }
            distance = 0;
            direction = getNextDirection(direction, availableDirections);
            if (direction === 0) {
                path.close();
                index = getStartIndex(edges);
                if (0 <= index) {
                    direction = Right;
                    path.moveTo(
                        index % edgeCount,
                        Math.floor(index / edgeCount),
                    );
                }
            }
        }
    }
    return path;
};
