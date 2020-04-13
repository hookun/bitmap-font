import {waitTransactionCompletion} from '../../../util/DBStore';
import {EditorState} from '../type';
import {DB} from '../../type';
import {mask} from './mask';

export const saveEditor = async (
    {names, store}: DB,
    editor: EditorState,
): Promise<void> => {
    const database = await store.open();
    const storeName = names.editor;
    const tr = database.transaction(storeName, 'readwrite');
    tr.objectStore(storeName).put(mask(editor));
    await waitTransactionCompletion(tr);
};
