import {DBStore} from '../util/DBStore';

export interface DBStoreNames {
    app: 'app',
    editor: 'editor',
    font: 'font',
    gryph: 'gryph',
}

export interface DB {
    names: DBStoreNames,
    store: DBStore,
}
