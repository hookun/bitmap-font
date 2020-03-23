import {DBStore} from '../util/DBStore';

export interface DBStoreNames {
    app: 'app',
    font: 'font',
    gryph: 'gryph',
}

export interface DB {
    names: DBStoreNames,
    store: DBStore,
}
