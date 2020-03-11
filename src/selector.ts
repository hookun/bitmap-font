import {createSelector} from 'reselect';
import {PathGeneratorState} from './type';
import {encodeMatrix} from './matrix';
import {calculatePath} from './util/calculatePath';
import {pages} from './constants';

export const selectFontName = (state: PathGeneratorState) => state.fontName;
export const selectWidth = (state: PathGeneratorState) => state.width;
export const selectHeight = (state: PathGeneratorState) => state.height;
export const selectArrowSize = (state: PathGeneratorState) => state.arrowSize;
export const selectArrowLength = (state: PathGeneratorState) => state.arrowLength;
export const selectMaxCellSize = (state: PathGeneratorState) => state.maxCellSize;
export const selectMatrix = (state: PathGeneratorState) => state.matrix;
export const selectMatrixData = createSelector(
    [selectMatrix, selectWidth, selectHeight],
    encodeMatrix,
);
export const selectPath = createSelector(
    [selectMatrix, selectWidth],
    (matrix, width) => calculatePath(matrix, width),
);
export const selectPathD = createSelector(
    [selectPath],
    (path) => path.toString(),
);
export const selectPathLength = createSelector(
    [selectPath],
    (path) => path.length,
);
export const selectPage = (state: PathGeneratorState) => state.page;
export const selectPageCharacters = createSelector(
    [selectPage],
    (page) => {
        const characters: Array<string> = [];
        for (const line of pages[page]) {
            for (const character of line) {
                characters.push(character.trim());
            }
        }
        return characters;
    },
);
export const selectCharacter = (state: PathGeneratorState) => state.character;
export const selectCellNumber = (state: PathGeneratorState) => state.cellNumber;
export const selectPathDirection = (state: PathGeneratorState) => state.pathDirection;
export const selectGrid = (state: PathGeneratorState) => state.grid;
export const selectPages = () => pages;
export const selectEditableCharacterSet = createSelector(
    [selectPages],
    (pages) => {
        const set = new Set<string>();
        for (const lines of Object.values(pages)) {
            for (const line of lines) {
                for (const character of line) {
                    if (character.trim()) {
                        set.add(character);
                    }
                }
            }
        }
        return set;
    },
);
export const selectEditableCharacterArray = createSelector(
    [selectEditableCharacterSet],
    (set) => [...set],
);
export const selectExportFormat = (state: PathGeneratorState) => state.exportFormat;
