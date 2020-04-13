import {takeEvery} from 'redux-saga/effects';

export const list = () => [
    takeEvery('*', (action) => {
        switch (action.type) {
            case 'SetEditorPointer':
                break;
            default:
                console.log(action);
        }
    }),
];
