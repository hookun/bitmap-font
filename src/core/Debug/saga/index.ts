import {takeEvery} from 'redux-saga/effects';

export const list = () => [
    takeEvery('*', (action) => {
        switch (action.type) {
            case 'DragEditor':
            case 'SetEditorPointer':
                break;
            default:
                console.log(JSON.stringify(action));
        }
    }),
];
