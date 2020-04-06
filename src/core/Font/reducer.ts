import {
    SetFontId,
    SagaSetFont,
    OpenEditor,
    CloseEditor,
    OpenEditors,
    SetFontConfig,
} from './action';
import {FontState} from './type';
import {createReducer, ActionType} from 'typesafe-actions';
import {patchFontState as patch} from './util/patchFontState';

export type FontActionCreator =
| typeof SagaSetFont
| typeof SetFontId
| typeof SetFontConfig
| typeof OpenEditors
| typeof OpenEditor
| typeof CloseEditor;

export type FontAction = ActionType<FontActionCreator>;

export const reducer = createReducer<FontState, FontAction>(patch())
.handleAction(SagaSetFont, (state, {payload: fontState}) => patch(state, fontState))
.handleAction(SetFontId, (state, {payload: id}) => patch(state, {id}))
.handleAction(SetFontConfig, (state, {payload}) => patch(state, payload))
.handleAction(OpenEditors, (state, {payload: characters}) => {
    const editing = state.editing.slice();
    for (const character of characters) {
        editing.push(character.codePointAt(0));
    }
    return patch(state, {editing});
})
.handleAction(OpenEditor, (state, {payload: codePoint}) => {
    return patch(state, {editing: state.editing.concat(codePoint)});
})
.handleAction(CloseEditor, (state, {payload: codePoint}) => {
    const {editing} = state;
    const index = editing.indexOf(codePoint);
    if (index < 0) {
        return state;
    }
    return patch(
        state,
        {editing: [...editing.slice(0, index), ...editing.slice(index + 1)]},
    );
});
