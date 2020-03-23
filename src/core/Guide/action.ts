import {createAction} from 'typesafe-actions';

export const SetGuideCellId = createAction('SetGuideCellId')<boolean>();
export const SetGuidePathDirection = createAction('SetGuidePathDirection')<boolean>();
export const SetGuideGrid = createAction('SetGuideGrid')<boolean>();
