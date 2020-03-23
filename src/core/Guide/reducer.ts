import {
    SetGuideCellId,
    SetGuideGrid,
    SetGuidePathDirection,
} from './action';
import {GuideState} from './type';
import {createReducer, ActionType} from 'typesafe-actions';

export type GuideActionCreator =
| typeof SetGuideGrid
| typeof SetGuideCellId
| typeof SetGuidePathDirection;

export type GuideAction = ActionType<GuideActionCreator>;

export const defaultGuideState: GuideState = {
    grid: true,
    cellId: false,
    pathDirection: false,
};

export const reducer = createReducer<GuideState, GuideAction>(defaultGuideState)
.handleAction(SetGuideGrid, (state, {payload: grid}) => {
    return state.grid === grid ? state : {...state, grid};
})
.handleAction(SetGuideCellId, (state, {payload: cellId}) => {
    return state.cellId === cellId ? state : {...state, cellId};
})
.handleAction(SetGuidePathDirection, (state, {payload: pathDirection}) => {
    return state.pathDirection === pathDirection ? state : {...state, pathDirection};
});
