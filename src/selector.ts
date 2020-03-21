import {createSelector} from 'reselect';
import {PathGeneratorState, CharacterPage} from './types';
import {encodeMatrix} from './matrix';
import {calculatePath} from './util/calculatePath';
import {pages} from './constants';

export const selectFontName = (state: PathGeneratorState): string => state.fontName;
export const selectWidth = (state: PathGeneratorState): number => state.width;
export const selectHeight = (state: PathGeneratorState): number => state.height;
export const selectArrowSize = (state: PathGeneratorState): number => state.arrowSize;
export const selectArrowLength = (state: PathGeneratorState): number => state.arrowLength;
export const selectMaxCellSize = (state: PathGeneratorState): number => state.maxCellSize;
export const selectMatrix = (state: PathGeneratorState): Array<boolean> => state.matrix;
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
export const selectPage = (state: PathGeneratorState): CharacterPage => state.page;
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
export const selectCharacter = (state: PathGeneratorState): string => state.character;
export const selectCellNumber = (state: PathGeneratorState): boolean => state.cellNumber;
export const selectPathDirection = (state: PathGeneratorState): boolean => state.pathDirection;
export const selectGrid = (state: PathGeneratorState): boolean => state.grid;
export const selectPages = (): typeof pages => pages;
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
export const selectExportFormat = (state: PathGeneratorState): string => state.exportFormat;
