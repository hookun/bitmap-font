import {useSelector} from 'react-redux';
import {selectKeyboardPressed} from '../core/KeyBoard/selector';
import {KeyCode} from '../constants';
import {useMemo} from 'react';

export const useAltKey = (): boolean => {
    const pressed = useSelector(selectKeyboardPressed);
    return useMemo(
        () => pressed.has(KeyCode.Alt) || pressed.has(KeyCode.Ctrl),
        [pressed],
    );
};
