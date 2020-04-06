import {waitTransactionCompletion} from '../../../util/DBStore';
import {FontState} from '../type';
import {DB} from '../../type';
import {patchFontState} from './patchFontState';

export const loadFont = async (
    {names, store}: DB,
    id: string,
): Promise<FontState> => {
    const database = await store.open();
    const storeName = names.font;
    const tr = database.transaction(storeName, 'readonly');
    const req = tr.objectStore(storeName).get([id]);
    await waitTransactionCompletion(tr);
    return patchFontState(req.result, {id});
};
