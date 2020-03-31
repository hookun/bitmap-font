import {waitTransactionCompletion} from '../../../util/DBStore';
import {DB} from '../../type';

export const saveLastFontName = async (
    {names, store}: DB,
    fontName: string,
): Promise<void> => {
    const database = await store.open();
    const storeName = names.app;
    const tr = database.transaction(storeName, 'readwrite');
    tr.objectStore(storeName).put(fontName, 'fontName');
    await waitTransactionCompletion(tr);
};
