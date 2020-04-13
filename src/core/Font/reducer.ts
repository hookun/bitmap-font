import {
    SetFontId,
    SagaSetFont,
    SetFontConfig,
} from './action';
import {FontState} from './type';
import {createReducer, ActionType} from 'typesafe-actions';
import {patchFontState as patch} from './util/patchFontState';

export type FontActionCreator =
| typeof SagaSetFont
| typeof SetFontId
| typeof SetFontConfig;

export type FontAction = ActionType<FontActionCreator>;

export const reducer = createReducer<FontState, FontAction>(patch())
.handleAction(SagaSetFont, (state, {payload: fontState}) => patch(
    state,
    fontState,
))
.handleAction(SetFontId, (state, {payload: id}) => patch(state, {id}))
.handleAction(SetFontConfig, (state, {payload}) => patch(state, payload));
