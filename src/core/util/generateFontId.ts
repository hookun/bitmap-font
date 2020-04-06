import {URLSafeBase64} from '@hookun/util/base64';

export const generateNewId = (): string => {
    const view = new DataView(new Uint8Array(6).buffer);
    view.setUint32(0, Date.now(), false);
    return URLSafeBase64.encode(view.buffer);
};
