import {waitTransactionCompletion} from '../../../util/DBStore';
import {FontState} from '../type';
import {DB} from '../../type';

export const saveFont = async (
    {names, store}: DB,
    font: FontState,
): Promise<void> => {
    const database = await store.open();
    const storeName = names.font;
    const tr = database.transaction(storeName, 'readwrite');
    const masked = {...font};
    tr.objectStore(storeName).put(masked);
    await waitTransactionCompletion(tr);
};
