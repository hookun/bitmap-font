export type CharacterPage = 'かな' | 'が' | 'ぱ' | 'カナ' | 'ガ' | 'パ' | 'ABC';
export interface PathGeneratorState {
    fontName: string,
    arrowSize: number,
    arrowLength: number,
    maxCellSize: number,
    width: number,
    height: number,
    matrix: Array<boolean>,
    page: CharacterPage,
    character: string,
    cellNumber: boolean,
    grid: boolean,
    pathDirection: boolean,
    exportFormat: string,
}
