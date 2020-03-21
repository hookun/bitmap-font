import * as idb from 'idb-keyval';

export interface LocalStore<Type> {
    get: (key: string) => Promise<Type | undefined>,
    set: (key: string, value: Type) => Promise<void>,
}

export const createStore = <Type>(fontName = 'default'): LocalStore<Type> => {
    const store = new idb.Store('BitmapFont', fontName);
    return {
        get: (key: string): Promise<Type | undefined> => idb.get(key, store),
        set: (key: string, value: Type): Promise<void> => idb.set(key, value, store),
    };
};
