export const waitTransactionCompletion = async (tr: IDBTransaction): Promise<void> => {
    await new Promise((resolve, reject) => {
        tr.addEventListener('error', () => reject(tr.error));
        tr.addEventListener('complete', resolve);
    });
};

export class DBStore {

    public readonly name: string;

    public readonly version: number;

    public readonly stores: {[storeName: string]: IDBObjectStoreParameters | null};

    public constructor(
        {name, version, stores}: {
            name: string,
            version: number,
            stores: {[storeName: string]: IDBObjectStoreParameters | null},
        },
    ) {
        this.name = name;
        this.version = version;
        this.stores = stores;
    }

    public async open(): Promise<IDBDatabase> {
        return await new Promise<IDBDatabase>((resolve, reject) => {
            const req = indexedDB.open(this.name, this.version);
            req.addEventListener('success', () => resolve(req.result));
            req.addEventListener('error', () => reject(req.error));
            req.addEventListener('blocked', () => reject(req.error));
            req.addEventListener('upgradeneeded', () => {
                const db = req.result;
                for (const [storeName, storeParameters] of Object.entries(this.stores)) {
                    db.createObjectStore(storeName, storeParameters);
                }
            });
        });
    }

}
