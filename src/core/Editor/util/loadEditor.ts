import {waitTransactionCompletion} from '../../../util/DBStore';
import {EditorState} from '../type';
import {DB} from '../../type';
import {patchEditorState} from './patchEditorState';
import {stateMask} from './mask';

export const loadEditor = async (
    {names, store}: DB,
    id: string,
): Promise<EditorState> => {
    const database = await store.open();
    const storeName = names.editor;
    const tr = database.transaction(storeName, 'readonly');
    const req = tr.objectStore(storeName).get([id]);
    await waitTransactionCompletion(tr);
    return patchEditorState(req.result, stateMask, {id});
};
