import {createSelector} from 'reselect';
import {KeyboardState} from './type';

export const selectKeyboard = ({Keyboard}: {Keyboard: KeyboardState}): KeyboardState => Keyboard;
export const selectKeyboardPressed = createSelector([selectKeyboard], ({pressed}) => pressed);
export const selectKeyboardHistory = createSelector([selectKeyboard], ({history}) => history);
