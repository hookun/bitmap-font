import {
    PressKey,
    ReleaseKey,
} from './action';
import {KeyboardState} from './type';
import {createReducer, ActionType} from 'typesafe-actions';

export type KeyboardActionCreator =
| typeof PressKey
| typeof ReleaseKey;

export type KeyboardAction = ActionType<KeyboardActionCreator>;

export const initialKeyboardState: KeyboardState = {
    pressed: new Set(),
    history: [],
};

export const historyLength = 20;

export const reducer = createReducer<KeyboardState, KeyboardAction>(initialKeyboardState)
.handleAction(PressKey, (state, {payload: event}) => {
    const pressed = new Set(state.pressed);
    pressed.add(event.keyCode);
    const history = [event, ...state.history].slice(0, historyLength);
    return {pressed, history};
})
.handleAction(ReleaseKey, (state, {payload: event}) => {
    const pressed = new Set(state.pressed);
    pressed.delete(event.keyCode);
    const history = [event, ...state.history].slice(0, historyLength);
    return {pressed, history};
});
