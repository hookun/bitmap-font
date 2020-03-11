import * as idb from 'idb-keyval';

export const createStore = (fontName = 'default') => {
    const store = new idb.Store('BitmapFont', fontName);
    return {
        get: <Type>(key: string): Promise<Type | undefined> => idb.get(key, store),
        set: <Type>(key: string, value: Type): Promise<void> => idb.set(key, value, store),
    };
};
