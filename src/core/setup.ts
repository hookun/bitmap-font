import {combineReducers, applyMiddleware, createStore, Store} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {all} from 'redux-saga/effects';
import {reducer as GuideReducer} from './Guide/reducer';
import {reducer as FontReducer} from './Font/reducer';
import {list as listFontSaga} from './Font/saga';
import {list as listGlyphSaga} from './Glyph/saga';
import {Restart} from './action';

export const setup = (): Store => {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
        combineReducers({
            Font: FontReducer,
            Guide: GuideReducer,
        }),
        applyMiddleware(sagaMiddleware),
    );
    sagaMiddleware.run((function* () {
        yield all([
            ...listFontSaga(),
            ...listGlyphSaga(),
        ]);
    }));
    store.dispatch(Restart());
    return store;
};
