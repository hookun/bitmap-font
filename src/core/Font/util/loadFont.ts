import {waitTransactionCompletion} from '../../../util/DBStore';
import {FontState} from '../type';
import {DB} from '../../type';

export const loadFont = async (
    {names, store}: DB,
    fontName: string,
): Promise<FontState> => {
    const database = await store.open();
    const storeName = names.font;
    const tr = database.transaction(storeName, 'readonly');
    const req = tr.objectStore(storeName).get([fontName]);
    await waitTransactionCompletion(tr);
    return req.result as FontState;
};
