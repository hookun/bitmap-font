import {combineReducers, applyMiddleware, createStore, Store} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {all} from 'redux-saga/effects';
import {reducer as GuideReducer} from './Guide/reducer';
import {reducer as FontReducer} from './Font/reducer';
import {reducer as KeyboardReducer} from './KeyBoard/reducer';
import {reducer as EditorReducer} from './Editor/reducer';
import {list as listFontSaga} from './Font/saga';
import {list as listGlyphSaga} from './Glyph/saga';
import {Restart} from './action';
import {PressKey, ReleaseKey} from './KeyBoard/action';

export const reducer = combineReducers({
    Font: FontReducer,
    Guide: GuideReducer,
    Keyboard: KeyboardReducer,
    Editor: EditorReducer,
});

export const setup = (document: Document): Store => {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(reducer, applyMiddleware(sagaMiddleware));
    sagaMiddleware.run((function* () {
        yield all([
            ...listFontSaga(),
            ...listGlyphSaga(),
        ]);
    }));
    store.dispatch(Restart());
    document.addEventListener('keydown', (event) => {
        store.dispatch(PressKey(event));
    });
    document.addEventListener('keyup', (event) => {
        store.dispatch(ReleaseKey(event));
    });
    return store;
};

export type BMFState = ReturnType<typeof reducer>;
export type BMFSelector<Type> = (state: BMFState) => Type;
