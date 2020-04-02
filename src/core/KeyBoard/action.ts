import {createAction} from 'typesafe-actions';

export const PressKey = createAction('PressKey')<KeyboardEvent>();
export const ReleaseKey = createAction('ReleaseKey')<KeyboardEvent>();
