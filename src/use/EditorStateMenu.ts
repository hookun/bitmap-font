import {useSelector} from 'react-redux';
import {selectEditor} from '../core/Editor/selector';

export const useEditorMenuState = (codePoint: number): boolean => {
    const {menu} = useSelector(selectEditor);
    return menu === codePoint;
};
