import {createAction} from 'typesafe-actions';

export const Restart = createAction('Restart')();
export const PointerDown = createAction('PointerDown')<MouseEvent | TouchEvent>();
