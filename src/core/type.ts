import {DBStore} from '../util/DBStore';

export type Point = [number, number];

export interface DBStoreNames {
    app: 'app',
    editor: 'editor',
    font: 'font',
    glyph: 'glyph',
}

export interface DB {
    names: DBStoreNames,
    store: DBStore,
}
