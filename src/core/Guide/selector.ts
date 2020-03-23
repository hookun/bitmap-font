import {createSelector} from 'reselect';
import {GuideState} from './type';

export const selectGuide = ({Guide}: {Guide: GuideState}): GuideState => Guide;
export const selectGuideGrid = createSelector([selectGuide], ({grid}) => grid);
export const selectGuideCellId = createSelector([selectGuide], ({cellId}) => cellId);
export const selectGuidePathDirection = createSelector([selectGuide], ({pathDirection}) => pathDirection);
